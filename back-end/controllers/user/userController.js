const userModel = require("../../models/user/User");
const portfolioModel = require("../../models/portfolio/Portfolio");
const empHistoryModel = require("../../models/employmentHistory/employmentHistory");
const empOtherExpModel = require("../../models/employmentHistory/otherExperience");

const { verify } = require("jsonwebtoken");
const mail = require("../../sendMail");
const { sendVerifyDesign } = require("../../static/verify.js");
const { sendForgotPasswordDesign } = require("../../static/forgetPassword");
const { sign } = require("jsonwebtoken");
const convert = require("../../converter");
const cloudinary = require("../../cloudinary");

module.exports = {
	// --------- User Registration ---------------- //

	async register(req, res) {
		try {
			console.log(req.body);
			if (!(req.body.isClient ^ req.body.isFreelancer)) {
				return res.status(400).send({
					msg: "Please select your account type !!!",
				});
			}
			const newUser = new userModel({ ...req.body });
			const user = await newUser.save();
			user.generateToken();
			await user.save({ validateBeforeSave: false });
			console.log("user register=", user);
			// let link = `http://localhost:5000/verify?token=${user.token}`
			const verifyHtml = sendVerifyDesign(
				`http://localhost:5000/verify?token=${user.token}`,
				user.userName,
			);
			// let html= `<a href="${process.env.USER_VERIFY_LINK}verify?token=${user.token}">Verify</a>`;
			const mailConfig = {
				html: verifyHtml,
				newUser,
				subject: "Verify your email address to complete registration",
			};
			// let html = `<a href="http://localhost:5000/verify?token=${user.token}">Verify</a>`;
			await mail.mailConfig(mailConfig);
			return res.status(200).send({
				msg: {
					title:
						"Account created sucessfully, please verify your email before login !!!",
					text: "Didnot get email ? please register again !!!",
				},
			});
		} catch (err) {
			console.log(err);
			return res.status(500).send({ msg: err.message });
		}
	},

	//----------------------------- User Login -----------------------//

	async login(req, res) {
		const { password, userEmail } = req.body;
		if (!password || !userEmail)
			return res.status(404).send({ msg: "Pls give email and password" });
		try {
			const user = await userModel.findByEmailAndPassword(userEmail, password);

			if (user[0].isAuthorized) {
				user[0].generateToken();
				user[0].generateRefreshToken();
				await user[0].save({ validateBeforeSave: false });

				return res.status(200).send({
					msg: `Welcome ${user[0].userName}`,
					userId: user[0].id,
					userName: user[0].userName,
					userEmail: user[0].userEmail,
					accessToken: user[0].token,
					companyName: user[0].companyName,
					refreshToken: user[0].refreshToken,
					isClient: user[0].isClient,
					category: user[0].category,
					isFreelancer: user[0].isFreelancer,
					profileImage: user[0].profileImage,
					acceptTermsCondition: user[0].acceptTermsCondition,
				});
			} else {
				return res.status(401).send({
					msg: "Please verify your account before you log in !!!",
				});
			}
		} catch (err) {
			return res.status(404).send({ msg: err });
		}
	},

	//---------------------------------  User Logout --------------------//

	async logout(req, res) {
		try {
			const currentUser = req.userId;
			const user = await userModel.findById(currentUser);
			if (user) {
				user.token = null;
				user.refreshToken = null;
				await user.save({ validateBeforeSave: false });
				return res.status(200).send({ msg: "Thank you visit again" });
			} else {
				throw Error("Please Login first");
			}
		} catch (err) {
			return res.status(500).send(err.message);
		}
	},
	async checkAuthentication(req, res) {
		try {
			res.status(200).send({ msg: "Your token is not expired" });
		} catch (err) {
			res.status(500).send({ msg: err.message });
		}
	},

	//----------- Creating Client Account ----------//

	async createClientAccount(req, res) {
		const checkUserClient = await userModel.findOne({ _id: req.userId });

		if (checkUserClient.isClient) {
			return res.send({
				msg: "You already have a client account !!!",
			});
		}
		const updatedUser = await userModel.findByIdAndUpdate(
			{ _id: req.userId },
			{ ...req.body },
			{ new: true },
		);
		console.log(updatedUser);

		return res.send({
			user: updatedUser,
		});
	},

	//----------- Creating Freelancer Account ----------//

	async createFreelancerAccount(req, res) {
		const checkUserClient = await userModel.findOne({ _id: req.userId });
		// console.log()

		if (checkUserClient.isFreelancer) {
			return res.send({
				msg: "You already have a Freelancer account !!!",
			});
		}
		// console.log("he")
		const updatedUser = await userModel.findByIdAndUpdate(
			{ _id: req.userId },
			{ ...req.body },
			{ new: true },
		);
		console.log(updatedUser);

		return res.send({
			user: updatedUser,
		});
	},

	//----------- Creating Client Account ----------//

	async createClientAccount(req, res) {
		const checkUserClient = await userModel.findOne({ _id: req.userId });

		if (checkUserClient.isClient) {
			return res.send({
				msg: "You already have a client account !!!",
			});
		}
		const updatedUser = await userModel.findByIdAndUpdate(
			{ _id: req.userId },
			{ ...req.body },
			{ new: true },
		);
		console.log(updatedUser);

		return res.send({
			user: updatedUser,
		});
	},

	//----------- Verifying user account ----------//
	async verify(req, res) {
		console.log(req.query);
		const { token } = req.query;
		try {
			verify(token, process.env.PRIVATE_KEY);
			const user = await userModel.findOne({ token });
			console.log(user);
			if (user) {
				user.isAuthorized = true;

				//   console.log("Hi")
				// console.log(user);
				await user.save({ validateBeforeSave: false });

				// return res.send({
				//   // msg: "You have been Suceesfully Verified you can login now ",
				// });
				return res.send(`<h1 style="text-align:center">You have been sucessfully verified</h1> <script>setTimeout(()=>{
          window.location.href="http://localhost:3000/login"
        },4000)</script>`);
			}
		} catch (err) {
			console.log(err.message);
			return res.redirect(`/resendEmail?token=${token}`);
		}
	},
	async sendForgotPasswordEmail(req, res) {
		const { userEmail } = req.body;
		if (!userEmail) {
			return res.status(403).send({
				msg: "please provide your email !!!",
			});
		}
		try {
			const user = await userModel.findOne({ userEmail: userEmail });
			if (!user.isSocialLogin) {
				console.log(user);
				if (!user) {
					return res
						.status(403)
						.send({ msg: "Please create your account first" });
				}
				const forgotPasswordToken = await sign(
					{ id: user._id },
					process.env.PRIVATE_KEY,
					{ expiresIn: "4h" },
				);
				const forgotPasswordHtml = sendForgotPasswordDesign(
					`http://localhost:3000/changePassword/${forgotPasswordToken}`,
					user.userName,
				);

				const mailConfig = {
					html: forgotPasswordHtml,
					newUser: user,
					subject: "Forgot Password Confirmation mail ",
				};

				// let html = `<a href="http://localhost:5000/changePassword/${user[0].token/forgotPasswordToken}">Click Here to change the password</a>`;
				const email = await mail.mailConfig(mailConfig);
				return res.status(200).send({
					msg: {
						title: "Reset Password link has been send ",
						text: "Please Check your Email to reset password",
					},
					forgotPasswordToken,
				});
			} else {
				return res.status(200).send({
					msg: "Your email is not valid !!!",
				});
			}
		} catch (err) {
			console.log(err);
			return res.status(500).send({ msg: err.message });
		}
	},

	async changePassword(req, res) {
		try {
			const { newPassword, confirmPassword } = req.body;
			const { token } = req.params;
			const verified = verify(token, process.env.PRIVATE_KEY);
			if (!newPassword) {
				res.status(403).send({
					msg: "New Password field cannot be empty !!!",
				});
			} else if (!confirmPassword) {
				res.status(403).send({
					msg: "Confirm Password field cannot be empty !!!",
				});
			}

			if (newPassword !== confirmPassword) {
				return res.status(403).send({
					msg: "Confirm password does not match with the new Password !!!",
				});
			}
			const user = await userModel.findById(verified.id);
			user.password = newPassword;
			const changedUserPassword = await user.save();

			if (changedUserPassword) {
				return res.status(200).send({
					msg: "Password has been changed sucessfully !!!",
				});
			}
		} catch (err) {
			return res.status(500).send({
				msg: err.message,
			});
		}
	},
	async resendEmail(req, res) {
		console.log("token::", req.query.token);
		const { token } = req.query;
		try {
			const user = await userModel.findOne({ token });
			console.log(user);
			// console.log("Hello Iam going to resend Email");
			user.generateToken();
			const updatedUser = await user.save({ validateBeforeSave: false });
			const verifyHtml = sendVerifyDesign(
				`http://localhost:5000/verify?token=${updatedUser.token}`,
				updatedUser.userName,
			);
			const mailConfig = {
				html: verifyHtml,
				newUser: updatedUser,
				subject: "Verify your email address to complete registration",
			};
			// let html = `<a href="http://localhost:5000/verify?token=${user.token}">Verify</a>`;
			await mail.mailConfig(mailConfig);
			return res.status(200).send({
				msg:
					"Your token was expired so we send another conformation email so please check your inbox",
			});
		} catch (err) {
			console.log(err);
			return res.status(500).send({ msg: err.message });
		}
	},

	async postEditUserProfile(req, res) {
		let skills = req.body.skills.split(",");
		let specializationSkills = req.body.specializationSkills.split(",");
		try {
			console.log(req.files);
			if (req.files.length) {
				const imageContentProfileImage = convert(
					req.files[0].originalname,
					req.files[0].buffer,
				);
				const imageContentResume = convert(
					req.files[1].originalname,
					req.files[1].buffer,
				);
				const profileImage = await cloudinary.uploader.upload(
					imageContentProfileImage,
				);
				const resume = await cloudinary.uploader.upload(imageContentResume);
				console.log(req.body);
				const copiedReqBody = {
					profileImage: profileImage.secure_url,
					resume: resume.secure_url,
					address: {
						pinNo: req.body.pinNo,
						city: req.body.city,
						country: req.body.country,
						state: req.body.state,
					},
					category: req.body.category,
					education: [
						{
							collegeName: req.body.collegeName,
							degree: req.body.degree,
							startingYear: req.body.startingYear,
							passoutYear: req.body.passoutYear,
						},
					],
					skills,
					languages: [
						{
							medium: req.body.medium,
							fluency: req.body.fluency,
						},
					],
					specialization: [
						{
							specializationTitle: req.body.specializationTitle,
							specializationSkills,
						},
					],
					title: req.body.title,
					availability: req.body.availability,
					freelancerDescription: req.body.freelancerDescription,
					phoneNo: req.body.phoneNo,
					addharNo: req.body.addharNo,
					panNo: req.body.panNo,
					GSTIN: req.body.GSTIN,
					projectPreference: req.body.projectPreference,
					experienceLevel: req.body.experienceLevel,
					hourlyRate: req.body.hourlyRate,
					acceptTermsCondition: req.body.acceptTermsCondition,
				};
				const updatedProfile = await userModel.findByIdAndUpdate(
					req.userId,
					{ ...copiedReqBody },
					{ new: true },
				);
				return res.status(200).send({
					msg: "Your profile has been updated successfully !!!",
					userId: updatedProfile.id,
					userName: updatedProfile.userName,
					userEmail: updatedProfile.userEmail,
					accessToken: updatedProfile.token,
					refreshToken: updatedProfile.refreshToken,
					isClient: updatedProfile.isClient,
					isFreelancer: updatedProfile.isFreelancer,
					profileImage: updatedProfile.profileImage,
					comapanyName: updatedProfile.companyName,
					acceptTermsCondition: updatedProfile.acceptTermsCondition,
					category: updatedProfile.category,
				});
			} else {
				return res.status(403).send({
					msg: "Pls fill all the required fields !!!",
				});
			}
		} catch (err) {
			return res.status(500).send({
				msg: err.message,
			});
		}
	},
	async postEditClientProfile(req, res) {
		console.log(req.file);
		try {
			if (req.file) {
				const imageContentProfileImage = convert(
					req.file.originalname,
					req.file.buffer,
				);
				const profileImage = await cloudinary.uploader.upload(
					imageContentProfileImage,
				);
				const copiedBody = {
					profileImage: profileImage.secure_url,
					tagLine: req.body.companyTagline,
					acceptTermsCondition: req.body.acceptTermsCondition,
					companyContactDetails: {
						pinNo: req.body.pinNo,
						city: req.body.city,
						country: req.body.country,
						state: req.body.state,
					},
					companyDescription: req.body.companyDescription,
					phoneNo: req.body.phoneNo,
					vatId: req.body.vatId,
					panNo: req.body.panNo,
					GSTIN: req.body.GSTIN,
					companyOwnerName: req.body.companyOwner,
					companyLink: req.body.companyWebsite,
					companyName: req.body.companyName,
				};

				const clientUpdatedProfile = await userModel.findByIdAndUpdate(
					req.userId,
					{ ...copiedBody },
					{ new: true },
				);
				return res.status(200).send({
					msg: "Your profile has been updated successfully !!!",
					userId: clientUpdatedProfile.id,
					userName: clientUpdatedProfile.userName,
					userEmail: clientUpdatedProfile.userEmail,
					accessToken: clientUpdatedProfile.token,
					refreshToken: clientUpdatedProfile.refreshToken,
					isClient: clientUpdatedProfile.isClient,
					isFreelancer: clientUpdatedProfile.isFreelancer,
					profileImage: clientUpdatedProfile.profileImage,
					acceptTermsCondition: clientUpdatedProfile.acceptTermsCondition,
					companyName: clientUpdatedProfile.comapanyName,
				});
			} else {
				throw new Error("Please provide the profile Image");
			}
		} catch (err) {
			return res.status(500).send({
				msg: err.message,
			});
		}
	},
	async getUserProfile(req, res) {
		try {
			const userProfile = await userModel.findById(req.userId);
			return res.status(200).send({
				msg: "All user profile details",
				userProfile,
			});
		} catch (err) {
			return res.status(500).send({
				msg: err.message,
			});
		}
	},
	async portfolioUpdate(req, res) {
		try {
			if (req.file) {
				const imageContentPortfolioImage = convert(
					req.file.originalname,
					req.file.buffer,
				);
				const portfolioImage = await cloudinary.uploader.upload(
					imageContentPortfolioImage,
				);
				const copiedBody = {
					image: portfolioImage.secure_url,
					portfolioLink: req.body.portfolioLink,
					overview: req.body.portfolioDescription,
					portfolioTitle: req.body.portfolioTitle,
					user: req.userId,
				};

				const portfolio = new portfolioModel({ ...copiedBody });
				const userPortfolio = await portfolio.save();

				return res.status(200).send({
					msg: "Your portfolio has been updated successfully !!!",
					userPortfolio,
				});
			} else {
				throw new Error("Please provide the portfolio Image");
			}
		} catch (err) {
			return res.status(500).send({
				msg: err.message,
			});
		}
	},
	async updateEmpHistory(req, res) {
		try {
			if (
				req.body.hasOwnProperty("experienceTitle") &&
				req.body.hasOwnProperty("experienceDetails")
			) {
				const empHistory = await empHistoryModel.findOne({ user: req.userId });
				const experience = await empOtherExpModel.find({
					_id: empHistory.otherExperience,
				});
				experience[0].otherExperience.push({
					title: req.body.experienceTitle,
					description: req.body.experienceDetails,
				});
				const exp = await experience[0].save();
				return res.status(200).send({
					msg: "Sucessfull",
					otherExperience: exp,
				});
			} else {
				if (!(await empOtherExpModel.find({ user: req.userId })).length) {
					const otherExperience = new empOtherExpModel({ user: req.userId });
					const otherExp = await otherExperience.save();
					req.body.otherExperience = otherExp._id;
					req.body.user = req.userId;
					const empHistory = new empHistoryModel({
						...req.body,
					});
					const emp = await empHistory.save();
				} else {
					const otherExp = await empOtherExpModel.findOne({ user: req.userId });
					req.body.otherExperience = otherExp._id;
					req.body.user = req.userId;
					const empHistory = new empHistoryModel({
						...req.body,
					});
					const emp = await empHistory.save();
				}
			}
			const employeeHistory = await empHistoryModel.find({ user: req.userId });
			return res.status(200).send({
				msg: "Succesfully Updated !!!",
				employeeHistory,
			});
		} catch (err) {
			return res.status(500).send({
				msg: err.message,
			});
		}
	},

	async getSpecificUserProfile(req, res) {
		try {
			const { freelancerId } = req.params;
			const user = await userModel.findById(freelancerId);
			const portfolio = await portfolioModel.find({ user: freelancerId });
			const employmentHistory = await empHistoryModel
				.find({
					user: freelancerId,
				})
				.populate({ path: "otherExperience" });
			return res.status(200).send({
				msg: "Specific user profile data",
				user,
				portfolio,
				employmentHistory,
			});
		} catch (err) {
			return res.status(500).send({
				msg: err.message,
			});
		}
	},
	async socialRegistration(req, res) {
		try {
			if (!(req.body.isClient ^ req.body.isFreelancer)) {
				return res.status(400).send({
					msg: "Please select your account type !!!",
				});
			}
			req.body.isSocialLogin = true;
			const newUser = new userModel({ ...req.body });
			const user = await newUser.save({ validateBeforeSave: false });
			return res.status(200).send({
				msg: "Account created sucessfully...pls login",
			});
		} catch (err) {
			return res.status(500).send({
				msg: err.message,
			});
		}
	},
	async socialLogin(req, res) {
		const { email, socialLoginId } = req.body;
		try {
			const user = await userModel.find({
				email: email,
				socialLoginId: socialLoginId,
			});
			if (user[0]) {
				user[0].generateToken();
				user[0].generateRefreshToken();
				await user[0].save({ validateBeforeSave: false });
				return res.status(200).send({
					msg: `Welcome ${user[0].userName}`,
					userId: user[0].id,
					userName: user[0].userName,
					userEmail: user[0].userEmail,
					accessToken: user[0].token,
					companyName: user[0].companyName,
					refreshToken: user[0].refreshToken,
					isClient: user[0].isClient,
					category: user[0].category,
					isFreelancer: user[0].isFreelancer,
					profileImage: user[0].profileImage,
					acceptTermsCondition: user[0].acceptTermsCondition,
				});
			}
			return res.status(404).send({
				msg: "Incorrect credential !!!",
			});
		} catch (err) {
			return res.status(500).send({
				msg: err.message,
			});
		}
	},
};
