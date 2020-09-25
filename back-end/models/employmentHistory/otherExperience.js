const { Schema, model } = require("mongoose");

const empOtherExpModelSchema = Schema({
	otherExperience: [
		{
			title: {
				type: String,
			},
			description: {
				type: String,
			},
		},
	],
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
});

const empOtherExpModel = model("otherExperience", empOtherExpModelSchema);
module.exports = empOtherExpModel;
