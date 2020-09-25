const { verify } = require("jsonwebtoken");
const userModel = require("../models/user/User");

module.exports = {
	async authentication(req, res, next) {
		let isRefreshToken = null;
		let isToken = null;
		try {
			let refreshToken = verify(
				req.headers.authorization.split(",")[1],
				process.env.PRIVATE_KEY,
			);
			isRefreshToken = true;
			let token = verify(
				req.headers.authorization.split(",")[0],
				process.env.PRIVATE_KEY,
			);
			isToken = true;
			req.user = token;
			next();
		} catch (err) {
			if (err.message === "jwt expired") {
				const user = await userModel.findOne({
					refreshToken: req.headers.authorization.split(",")[1],
				});
				if (isRefreshToken && !isToken) {
					console.log("accessToken expire");
					user.generateToken();
					user.generateRefreshToken();
					await user.save({ validateBeforeSave: false });
					res.status(200).send({
						msg: `Welcome back ${user.userName} Your session has been renewed`,
						userId: user.id,
						userName: user.userName,
						userEmail: user.userEmail,
						accessToken: user.token,
						refreshToken: user.refreshToken,
					});
				} else if (!isRefreshToken) {
					console.log("all expire");
					if (user) {
						user.token = null;
						user.refreshToken = null;
						await user.save({ validateBeforeSave: false });
						res.status(401).send({
							msg:
								"Authentication failed...Your session has been expired...pls login again",
						});
					} else {
						res.status(500).send({
							msg: "Authentication failed...pls login first",
						});
					}
				}
			} else {
				res.status(500).send({
					msg: err.message,
				});
			}
		}
	},
	async dataAuthentication(req, res, next) {
		try {
			let token = verify(req.headers.authorization, process.env.PRIVATE_KEY);
			req.user = token;
			next();
		} catch (err) {
			// console.log(err);
			res.status(403).send({
				msg: "Authentication failed...pls login first",
			});
		}
	},
};
