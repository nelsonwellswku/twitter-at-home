import { readFileSync } from 'fs';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createTweetResolver } from '@src/features/createTweet/index.js'
import { InitializeAppRedisClient } from '@src/database/AppRedisClient.js';
import { Resolvers } from '@src/generated/graphql.js'
import { Tweet } from '@src/generated/graphql.js'

InitializeAppRedisClient();

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const tweets: Tweet[] = [{
  tweetId: '1',
  author: 'john@example.com',
  body: 'This is my first tweet',
  comments: [{
    commentId: '1',
    author: 'mary@example.com',
    body: 'Welcome to twitter-at-home!'
  }]
}, {
  tweetId: '2',
  author: 'john@example.com',
  body: 'What\'s good for dinner tonight?',
  comments: [{
    commentId: '2',
    author: 'mary@example.com',
    body: 'Popeye\'s chicken sandwich is great!',
  }, {
    commentId: '3',
    author: 'danielle@example.com',
    body: 'Tacos! Beef and onion',
  }]
}];

const resolvers: Resolvers = {
  Query: {
    Tweets: (): Tweet[] => tweets,
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
