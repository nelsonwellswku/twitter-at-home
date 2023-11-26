// Import required symbols
import { Resource } from '@opentelemetry/resources';
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { RedisInstrumentation } from '@opentelemetry/instrumentation-redis-4';
import { DataloaderInstrumentation } from '@opentelemetry/instrumentation-dataloader';
import { appConfig } from './appConfig.js';

// Register server-related instrumentation
registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new GraphQLInstrumentation(),
    new DataloaderInstrumentation({ enabled: true }),

    // todo: the only trace i see is when the db is connected but nothing about the actual db commands
    // look into this more deeply sometime
    new RedisInstrumentation(),
  ],
});

// Initialize provider and identify this particular service
const provider = new NodeTracerProvider({
  resource: Resource.default().merge(
    new Resource({
      // Replace with any string to identify this service in your system
      'service.name': 'tah-graphql',
    }),
  ),
});

const zipkinExporter = new ZipkinExporter();
provider.addSpanProcessor(new BatchSpanProcessor(zipkinExporter));

if (appConfig.telemetry.useConsoleExporter) {
  // for debugging purposes
  const consoleExporter = new ConsoleSpanExporter();
  provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));
}

// Register the provider to begin tracing
provider.register();
