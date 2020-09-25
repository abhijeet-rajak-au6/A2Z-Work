const { verify } = require("jsonwebtoken");
const userModel = require("../models/user/User");

module.exports = {
	async authentication(req, res, next) {
		try {
			const decodedToken = verify(
				req.headers.authorization,
				process.env.PRIVATE_KEY,
			);
			req.userId = decodedToken.id;
			next();
		} catch (err) {
			if (err.message === "jwt expired") {
				return res.status(401).send({
					msg: "Access Token is Expired !!!",
				});
			}
		}
	},
	async generateNewAccessToken(req, res) {
		const { refreshToken } = req.params;
		try {
			const userId = verify(
				refreshToken,
				process.env.PRIVATE_KEY_REFRESH_TOKEN,
			);
			const user = await userModel.findById(userId.id);

			user.generateToken();
			user.generateRefreshToken();

			const newUser = await user.save({ validateBeforeSave: false });

			return res.status(200).send({
				msg: `Welcome back ${newUser.userName}`,
				userId: newUser.id,
				userName: newUser.userName,
				userEmail: newUser.userEmail,
				companyName: newUser.companyName,
				accessToken: newUser.token,
				refreshToken: newUser.refreshToken,
				profileImage: newUser.profileImage,
				isClient: newUser.isClient,
				isFreelancer: newUser.isFreelancer,
				category: newUser.category,
				acceptTermsCondition: newUser.acceptTermsCondition,
			});
		} catch (err) {
			console.log(err.message);
			if (err.message === "jwt expired") {
				const user = await userModel.findOne({ refreshToken: refreshToken });
				user.token = null;
				user.refreshToken = null;
				await user.save({ validateBeforeSave: false });
				return res
					.status(403)
					.send({ msg: "Your session has been expired...pls login again" });
			}
		}
	},
};
