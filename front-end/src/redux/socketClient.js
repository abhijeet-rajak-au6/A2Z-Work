import io from "socket.io-client";

export const socketConnection = () => () => {
	const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
	try {
		const socket = io(`${process.env.REACT_APP_BASE_URL}`, {
			query: {
				accessToken: accessToken,
			},
		});
		console.log(socket);
		return socket;
	} catch (err) {
		console.error(err);
	}
};
