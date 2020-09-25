const { sign, verify } = require("jsonwebtoken");
// (async () => {
// 	const jwt = await sign({ id: 1 }, "privateKey", { expiresIn: 1 });
// 	console.log(jwt);
// })();

(async () => {
	const jwt =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk2Mjk1MTA4LCJleHAiOjE1OTYyOTUxMDl9.6YpAmYRYYen5i4U7SQMG8NjZ5MnT9AjiECVqgPo3VM4";
	try {
		const isVerified = verify(jwt, "privateKey");
		console.log(isVerified);
	} catch (err) {
		console.log(err);
	}
})();

// name: 'JsonWebTokenError',
//   message: 'invalid signature'

// name: 'TokenExpiredError',
//   message: 'jwt expired',
//   expiredAt: 2020-08-01T15:18:29.000Z
