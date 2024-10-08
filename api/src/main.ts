import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';

import { appConfig } from '@src/appConfig.js';
import { createValidator } from '@src/auth/validateToken.js';
import {
  initializeAppRedisClient,
  appRedisClient,
} from '@src/database/appRedisClient.js';
import { Resolvers } from '@src/generated/graphql.js';
import { createTweetResolver } from '@src/resolvers/createTweet/index.js';
import { getTweetsResolver } from '@src/resolvers/getTweets/index.js';
import { createUser } from '@src/user/createUser.js';
import { ApolloContext } from '@src/apolloContext.js';
import { createIndexes, dropIndexes } from '@src/database/createIndexes.js';
import { getUser } from '@src/resolvers/getUser/index.js';
import { createCommentResolver } from './resolvers/createComment.js';
import { getComments } from './resolvers/getComments.js';
import { UserDataSource } from './database/UserDataSource.js';
import { TweetDataSource } from './database/TweetDataSource.js';

await initializeAppRedisClient();
await dropIndexes();
await createIndexes();

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const validateToken = createValidator(appConfig.auth.wellKnownEndpoint);

const resolvers: Resolvers = {
  Query: {
    Tweets: getTweetsResolver,
  },
  Mutation: {
    CreateTweet: createTweetResolver,
    CreateComment: createCommentResolver,
  },
  Tweet: {
    author: getUser,
    comments: getComments,
  },
  Comment: {
    author: getUser,
  },
};

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer<ApolloContext>(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const innerContext: ApolloContext = {
      dataSources: {
        userDataSource: new UserDataSource(appRedisClient),
        tweetDataSource: new TweetDataSource(appRedisClient),
      },
    };

    const authHeader = req.headers.authorization || '';
    if (authHeader) {
      const [, token] = authHeader.split('Bearer ');
      const decodedJwt = await validateToken(token);

      await createUser({
        userId: decodedJwt.sub,
        firstName: decodedJwt.given_name,
        lastName: decodedJwt.family_name,
      });

      innerContext.user = { id: decodedJwt.sub };
    }
    return innerContext;
  },
});

console.log(`🚀  Server ready at: ${url}`);
