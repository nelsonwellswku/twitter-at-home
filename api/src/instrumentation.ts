// Import required symbols
import { Resource } from '@opentelemetry/resources';
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { RedisInstrumentation } from '@opentelemetry/instrumentation-redis-4';

// Register server-related instrumentation
registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new GraphQLInstrumentation(),

    // todo: the only trace i see is when the db is connected but nothing about the actual db commands
    // look into this more deeply sometime
    new RedisInstrumentation(),
  ]
});

// Initialize provider and identify this particular service
const provider = new NodeTracerProvider({
  resource: Resource.default().merge(new Resource({
    // Replace with any string to identify this service in your system
    "service.name": "tah-graphql",
  })),
});

// use the console exporter for debugging if necessary
// const consoleExporter = new ConsoleSpanExporter();
const zipkinExporter = new ZipkinExporter();
provider.addSpanProcessor(
  new SimpleSpanProcessor(zipkinExporter)
);

// Register the provider to begin tracing
provider.register();
