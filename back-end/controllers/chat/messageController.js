const chatroomModel = require("../../models/message/Chatroom");
const messageModel = require("../../models/message/Message");

module.exports = {
	async createChatroom(req, res) {
		try {
			const { name } = req.body;
			const nameRegex = /^[A-Za-z0-9_-]*$/gm;
			const pattern = new RegExp(nameRegex);
			if (pattern.test(name)) {
				const chatroomExists_1 = await chatroomModel.findOne({ name: name });
				const reverse = name.split("-")[1] + "-" + name.split("-")[0];
				const chatroomExists_2 = await chatroomModel.findOne({ name: reverse });
				if (chatroomExists_1) {
					res
						.status(200)
						.send({ msg: "Welcome back", chatroom: chatroomExists_1 });
				} else if (chatroomExists_2) {
					res
						.status(200)
						.send({ msg: "Welcome back", chatroom: chatroomExists_2 });
				} else {
					const newChatroom = new chatroomModel({ ...req.body });
					const chatroom = await newChatroom.save();
					res
						.status(200)
						.send({ msg: "chatroom created successfully", chatroom: chatroom });
				}
			} else {
				res.status(403).send({ msg: "Invalid chatroom name" });
			}
		} catch (err) {
			console.error(err);
			res.status(500).send({ msg: err.message });
		}
	},
	async getChatroomMessages(req, res) {
		try {
			const chatroomId = req.params.chatroomId;
			const messages = await messageModel
				.find({ chatroom: chatroomId })
				.populate("user");
			return res
				.status(200)
				.send({ msg: "Your previous conversations", messages });
		} catch (err) {
			console.error(err);
			res.status(500).send({ msg: err.message });
		}
	},
	async getAllChatrooms(req, res) {
		try {
			userId = req.userId;
			const chatrooms_1 = await chatroomModel
				.find({ freelancer: userId })
				.populate("client");
			const chatrooms_2 = await chatroomModel
				.find({ client: userId })
				.populate("freelancer");
			if (chatrooms_1.length) {
				return res
					.status(200)
					.send({ msg: "All chatrooms of the user", chatrooms: chatrooms_1 });
			} else if (chatrooms_2.length) {
				return res
					.status(200)
					.send({ msg: "All chatrooms of the user", chatrooms: chatrooms_2 });
			} else {
				return res
					.status(200)
					.send({ msg: "no chatroom available", chatrooms: [] });
			}
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
	async getSpecificChatroom(req, res) {
		try {
			const chatroomId = req.params.chatroomId;
			const chatroom = await chatroomModel.findById(chatroomId);
			res.status(200).send({ msg: "Your chatroom", chatroom });
		} catch (err) {
			return res.status(500).send({ msg: err.message });
		}
	},
};
