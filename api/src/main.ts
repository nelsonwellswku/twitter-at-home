import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';

import { appConfig } from '@src/appConfig.js';
import { createValidator } from '@src/auth/validateToken.js';
import { InitializeAppRedisClient } from '@src/database/AppRedisClient.js';
import { Resolvers } from '@src/generated/graphql.js';
import { createTweetResolver } from '@src/resolvers/createTweet/index.js';
import { getTweets } from '@src/resolvers/getTweets/index.js';
import { createUser } from '@src/user/createUser.js';


InitializeAppRedisClient();

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const validateToken = createValidator(appConfig.auth.wellKnownEndpoint);

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
  context: async ({ req }) => {

    const authHeader = req.headers.authorization || '';
    if (authHeader) {
      const [, token] = authHeader.split('Bearer ');
      const decodedJwt = await validateToken(token)

      await createUser({
        userId: decodedJwt.sub,
        firstName: decodedJwt.given_name,
        lastName: decodedJwt.family_name,
      })

      return {
        user: {
          id: decodedJwt.sub,
        }
      }
    }
    return {};
  }
});

console.log(`🚀  Server ready at: ${url}`);
