const { Schema, model } = require("mongoose");

const chatroomSchema = Schema({
	name: {
		type: String,
		trim: true,
		sparse: true,
		unique: true,
		required: [true, "Name required"],
	},
	freelancer: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: [true, "freelancer required"],
	},
	client: {
		type: Schema.Types.ObjectId,
		required: [true, "client required"],
		ref: "user",
	},
});

const chatroomModel = model("chatroom", chatroomSchema);
module.exports = chatroomModel;
