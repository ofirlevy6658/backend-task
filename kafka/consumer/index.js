const Kafka = require("node-rdkafka");
const axios = require("axios");
const eventType = require("../eventType.js");
var consumer = new Kafka.KafkaConsumer(
	{
		"group.id": "kafka",
		"metadata.broker.list": "localhost:9092",
	},
	{}
);

consumer.connect();

consumer
	.on("ready", () => {
		console.log("consumer ready..");
		consumer.subscribe(["test"]);
		consumer.consume();
	})
	.on("data", function (data) {
		axios.post(
			"https://webhook.site/ed26e126-8ffe-4a23-855c-e6286403b73b",
			eventType.fromBuffer(data.value)
		);
		console.log(`received message: ${eventType.fromBuffer(data.value)}`);
	});
