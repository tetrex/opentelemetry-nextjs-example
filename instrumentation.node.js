// tracing.js
"use strict";
const process = require("process");
const opentelemetry = require("@opentelemetry/sdk-node");
const {
	getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
	OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");
const { Resource } = require("@opentelemetry/resources");
const {
	SEMRESATTRS_SERVICE_NAME,
} = require("@opentelemetry/semantic-conventions");

// // Add otel logging when debugging
// const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const exporterOptions = {
	url: "https://ingest.in.signoz.cloud:443/v1/traces", // use your own data region
	headers: { "signoz-access-token": "854b93c8-ee1e-4778-9455-d097874eeed8" }, // Use if you are using SigNoz Cloud
};

const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new opentelemetry.NodeSDK({
	traceExporter,
	instrumentations: [getNodeAutoInstrumentations()],
	resource: new Resource({
		[SEMRESATTRS_SERVICE_NAME]: "SigNoz-Nextjs-Example",
	}),
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start();

// gracefully shut down the SDK on process exit
process.on("SIGTERM", () => {
	sdk
		.shutdown()
		.then(() => console.log("Tracing terminated"))
		.catch((error) => console.log("Error terminating tracing", error))
		.finally(() => process.exit(0));
});
