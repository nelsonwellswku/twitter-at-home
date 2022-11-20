import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const schema = `
  type Tweet {
    tweetId: String
    author: String
    body: String
    comments: [Comment]
  }

  type Comment {
    commentId: String,
    author: String,
    body: String,
  }

  type Query {
    Tweets: [Tweet]
  }
`;

const tweets = [{
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
    commentId: 3,
    author: 'danielle@example.com',
    body: 'Tacos! Beef and onion',
  }]
}];

const resolvers = {
  Query: {
    Tweets: (): unknown => tweets,
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
