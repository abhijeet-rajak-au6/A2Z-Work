const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
	todoTitle: {
		type: String,
		trim: true,
		required: [true, "Please provide the Todo title"],
	},
	description: {
		type: String,
		trim: true,
		required: [true, "Please provide the Todo title"],
	},
});

const todoModel = model("todo", todoSchema);
module.exports = todoModel;
