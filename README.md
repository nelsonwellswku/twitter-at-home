# Twitter At Home
**Me**: Can I sign up for Twitter?

**Mom**: We have Twitter at home

**Twitter at home**:
<br/><br/><br/>

Just a Twitter clone for fun

## Tech Stack

Since this is just for fun, I chose some tech to experiment with that I haven't necessarily used before. Some highlights of the tech stack include:

* Typescript for the UI and backend (Node)
* React
* [DaisyUI](https://daisyui.com/) components / Tailwind CSS
* [Apollo Client](https://www.apollographql.com/docs/react/) and [Apollo Server](https://www.apollographql.com/docs/apollo-server/) for GraphQL
* [Redis](https://redis.io/) with [JSON](https://redis.io/docs/data-types/json/) and [Search](https://redis.io/docs/interact/search-and-query/) modules for the persistent database
* [OpenTelemetry](https://opentelemetry.io/docs/instrumentation/js/) and [Zipkin](https://zipkin.io/) for traces and metrics

## Development

### pnpm

This app uses `pnpm` instead of `npm`. Follow the [installation instructions](https://pnpm.io/installation) for your platform.

### nvm

This app requires Node 20. To make it easy, it is recommended to [install nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to make use of the included .nvmrc file. It is also recommended to [integrate nvm with your shell](https://github.com/nvm-sh/nvm#deeper-shell-integration) so that the correct Node version will be used automatically when changing to the Twitter At Home directory.

### docker

The default way to run the app relies on [Docker](https://www.docker.com/get-started/) and [Docker Compose](https://docs.docker.com/compose/) to easily stand up a Redis database and a Zipkin instance for OpenTelemetry data.

### Running the app

With the prerequisites out of the way, running the app for local development is as simple running a few commands from the root directory.

```
pnpm i && pnpm i -C ui && pnpm i -C api
pnpm start
```

is will restore all of the dependencies and then run the UI, the backend, the Redis database, and the Zipkin instance.
