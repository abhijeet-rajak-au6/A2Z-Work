const mongoose = require("mongoose");

// Mongodb Atlas connection

// const databaseConnection = async () => {
// 	const connect = await mongoose.connect(
// 		process.env.MONGODB_URL.replace("<password>", process.env.MONGODB_PASSWORD),
// 		{
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 			useCreateIndex: true,
// 			useFindAndModify: false,
// 		},
// 	);
// 	if (connect) {
// 		console.log("Data base Connected Sucessfully");
// 	}
// };

// Local database connection

const databaseConnection = async () => {
	const connect = await mongoose.connect("mongodb://127.0.0.1:27017/A2ZWORK", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
	if (connect) {
		console.log("Data base Connected Sucessfully");
	}
};

databaseConnection();
