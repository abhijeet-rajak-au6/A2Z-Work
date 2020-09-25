const empHistoryModel = require("../../models/employmentHistory/employmentHistory");
const portfolioModel = require("../../models/portfolio/Portfolio");

module.exports = {
	async getEmpHistory(req, res) {
		try {
			const empHistory = await empHistoryModel
				.find({ user: req.userId })
				.populate({ path: "otherExperience" });
			return res.status(200).send({
				msg: "Employment history of user",
				empHistory,
			});
		} catch (err) {
			return res.status(200).send({
				msg: err.message,
			});
		}
	},
	async getUserPortfolio(req, res) {
		try {
			const userPortfolio = await portfolioModel.find({ user: req.userId });
			return res.status(200).send({
				msg: "Portfolio of user",
				userPortfolio,
			});
		} catch (err) {
			return res.status(200).send({
				msg: err.message,
			});
		}
	},
};
