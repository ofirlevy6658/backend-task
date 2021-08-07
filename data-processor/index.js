const axios = require("axios");
const Currency = require("./model/currency");
require("./db/mongoose");
require("dotenv").config();

const api_key = process.env.API_KEY;

const fetchCurrency = async () => {
	try {
		const { data } = await axios.get(
			`https://api.currencyscoop.com/v1/latest?api_key=${api_key}`
		);
		return data.response.rates.EUR;
	} catch (e) {
		console.log(e.message);
	}
};

(function updateExchangeRate() {
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
	}, 35000);
})();

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
