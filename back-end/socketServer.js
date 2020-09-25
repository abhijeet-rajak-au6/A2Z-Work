const { verify } = require("jsonwebtoken");

module.exports = {
	async socketConnection(socket, next) {
		try {
			const accessToken = socket.handshake.query.accessToken;
			let token = await verify(accessToken, process.env.PRIVATE_KEY);
			socket.userId = token.id;
			next();
		} catch (err) {
			console.log(err);
		}
	},
};
