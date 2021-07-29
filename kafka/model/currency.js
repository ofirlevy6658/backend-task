const mongoose = require("mongoose");

const Currency = mongoose.model("currency", {
	name: {
		type: String,
		required: true,
	},
	exchangeRate: {
		type: Number,
		required: true,
		default: 0,
	},
});
module.exports = Currency;
