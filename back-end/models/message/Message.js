const { Schema, model } = require("mongoose");

const messageSchema = Schema({
	chatroom: {
		type: Schema.Types.ObjectId,
		required: [true, "chatroom required"],
		ref: "chatroom",
	},
	user: {
		type: Schema.Types.ObjectId,
		required: [true, "user required"],
		ref: "user",
	},
	message: {
		type: String,
		required: [true, "message required"],
	},
});

const messageModel = model("message", messageSchema);
module.exports = messageModel;
