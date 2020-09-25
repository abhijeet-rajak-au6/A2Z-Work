const { Schema, model } = require("mongoose");

const empHistorySchema = Schema({
	companyName: {
		type: String,
	},
	companyWebsite: {
		type: String,
	},
	jobTitle: {
		type: String,
	},
	startingYear: {
		type: String,
	},
	endingYear: {
		type: String,
	},
	jobDescription: {
		type: String,
	},
	otherExperience:{
		type:Schema.Types.ObjectId,
		ref:"otherExperience"
	} ,
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
});

const empHistoryModel = model("empHistory", empHistorySchema);
module.exports = empHistoryModel;
