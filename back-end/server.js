const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { verify } = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const messageModel = require("./models/message/Message");
const userModel = require("./models/user/User");
const userRoutes = require("./routes/user/userRoutes");
const jobRoutes = require("./routes/job/jobRoutes");
const chatRoutes = require("./routes/message/messageRoutes");

dotenv.config();

require("./db");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const io = socketio(server);

app.use(cors());
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(jobRoutes);
app.use(chatRoutes);

app.get("/", (req, res) => {
	return res.send({ message: "Welcome To project testing" });
});

app.use((err, req, res, next) => {
	return res.status(403).send({
		msg: err.message,
	});
});

// Socket io connection

io.use(async (socket, next) => {
	try {
		if (socket) {
			const accessToken = socket.handshake.query.accessToken;
			let token = await verify(accessToken, process.env.PRIVATE_KEY);
			socket.userId = token.id;
			next();
		}
	} catch (err) {
		console.log(err);
	}
});

io.on("connection", socket => {
	console.log("connected", socket.userId);

	socket.on("disconnect", () => {
		console.log("disconnected", socket.userId);
	});

	socket.on("joinRoom", data => {
		const chatroomId = data.chatRoomId;
		socket.join(chatroomId);
		console.log("A user joined the room", data);
	});

	socket.on("leaveRoom", data => {
		const chatroomId = data.chatroomId;
		socket.leave(chatroomId);
		console.log("A user has left the room", data);
	});

	socket.on("chatroomMessage", async ({ chatRoomId, message }) => {
		if (message) {
			const user = await userModel.findOne({ _id: socket.userId });
			const newMessage = new messageModel({
				chatroom: chatRoomId,
				user: socket.userId,
				message: message,
			});
			io.to(chatRoomId).emit("newMessage", {
				message,
				user: user,
				userId: socket.userId,
			});
			await newMessage.save();
		}
	});
});

server.listen(PORT, () => {
	console.log("Server is running at port", PORT);
});
