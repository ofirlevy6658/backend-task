const mongoose = require("mongoose");

mongoose.connect("mongodb://mongodb:27017/currency-api", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
