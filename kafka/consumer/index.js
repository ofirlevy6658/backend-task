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
			"https://webhook.site/d13999c2-1e5c-441f-9aa6-76712851f005",
			eventType.fromBuffer(data.value)
		);
		console.log(`received message: ${eventType.fromBuffer(data.value)}`);
	});
