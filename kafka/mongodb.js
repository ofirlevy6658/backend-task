const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27018/currency-api", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
