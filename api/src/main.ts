import { readFileSync } from 'fs';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createTweetResolver } from '@src/resolvers/createTweet/index.js'
import { getTweets } from './resolvers/getTweets/index.js';
import { InitializeAppRedisClient } from '@src/database/AppRedisClient.js';
import { Resolvers } from '@src/generated/graphql.js'

InitializeAppRedisClient();

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const resolvers: Resolvers = {
  Query: {
    Tweets: getTweets,
  },
  Mutation: {
    CreateTweet: createTweetResolver,
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
