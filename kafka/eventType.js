const avro = require("avsc");

module.exports = avro.Type.forSchema({
	type: "record",
	fields: [
		{
			name: "name",
			type: "string",
		},
		{
			name: "exchangeRate",
			type: "string",
		},
	],
});
