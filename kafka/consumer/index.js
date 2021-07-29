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
			"https://webhook.site/df460bee-dbe0-42b6-bc85-b2da7c22c036",
			eventType.fromBuffer(data.value)
		);
		console.log(`received message: ${eventType.fromBuffer(data.value)}`);
	});
