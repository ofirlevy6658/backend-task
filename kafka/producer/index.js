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

let prevCurrency = 0;
async function queueRandomMessage() {
	const euro = await Currency.findOne({ name: "EUR" });
	const event = { name: euro.name, exchangeRate: euro.exchangeRate.toString() };
	console.log(prevCurrency);
	console.log(euro.exchangeRate);
	if (prevCurrency === euro.exchangeRate || euro.exchangeRate < 0.53) return;
	const success = stream.write(eventType.toBuffer(event));
	prevCurrency = euro.exchangeRate;
	if (success) {
		console.log(`message queued (${JSON.stringify(event)})`);
	} else {
		console.log("Too many messages in the queue already..");
	}
}

setInterval(() => {
	queueRandomMessage();
}, 3000);
