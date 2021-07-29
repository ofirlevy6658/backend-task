const axios = require("axios");
const express = require("express");
const Currency = require("./model/currency");

require("./db/mongoose");

const app = express();

const fetchCurrency = async () => {
	try {
		const { data } = await axios.get(
			"https://api.exchangerate.host/latest?base=USD"
		);
		return data.rates.EUR;
	} catch (e) {
		console.log(e.message);
	}
};

const updateExchangeRate = () => {
	setInterval(async () => {
		try {
			const newExchangeRate = await fetchCurrency();
			const euro = await Currency.findOne({ name: "EUR" });
			if (euro.exchangeRate === newExchangeRate) return;
			euro.exchangeRate = newExchangeRate;
			console.log(euro);
			euro.save();
		} catch (e) {
			console.log(e.message);
		}
	}, 2500);
};
updateExchangeRate();

// const curn = new Currency({
// 	name: "EUR",
// 	exchangeRate: 4,
// });

// curn
// 	.save()
// 	.then(() => {
// 		console.log("work");
// 	})
// 	.catch(() => console.log("fail"));

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
