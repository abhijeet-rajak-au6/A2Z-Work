const { Router } = require("express");
const {
	createChatroom,
	getChatroomMessages,
	getAllChatrooms,
	getSpecificChatroom,
} = require("../../controllers/chat/messageController");
const { authentication } = require("../../middlewares/Auth");
const router = Router();

router.post("/createChatroom", authentication, createChatroom);
router.get(
	"/chatroomMessages/:chatroomId",
	authentication,
	getChatroomMessages,
);
router.get("/allChatrooms", authentication, getAllChatrooms);
router.get("/chatroom/:chatroomId", authentication, getSpecificChatroom);
module.exports = router;
