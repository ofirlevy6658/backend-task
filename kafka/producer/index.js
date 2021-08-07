const Kafka = require("node-rdkafka");
const eventType = require("../eventType.js");
const Currency = require("../model/currency");
require("../mongodb");

const stream = Kafka.Producer.createWriteStream(
	{
		"metadata.broker.list": "localhost:9092",
	},
	{},
	{
		topic: "test",
	}
);
stream.on("error", (err) => {
	console.error("Error in our kafka stream");
	console.error(err);
});

(function queue() {
	const threshold = 0.83;
	let prevExchangeRate = 0;
	setInterval(async () => {
		try {
			const euro = await Currency.findOne({ name: "EUR" });
			const event = {
				name: euro.name,
				exchangeRate: euro.exchangeRate.toString(),
			};
			if (
				euro.exchangeRate === prevExchangeRate ||
				euro.exchangeRate < threshold
			)
				return;
			prevExchangeRate = euro.exchangeRate;
			const success = stream.write(eventType.toBuffer(event));
			if (success) console.log(`message queued (${JSON.stringify(event)})`);
		} catch (e) {
			console.log(e.message);
		}
	}, 1000);
})();
