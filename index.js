import { ApolloServer } from 'apollo-server';

import { resolvers } from './data/resolvers';
import loaders from './data/loaders';
import { typeDefs } from './data/schema';


const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: {
    loaders
  },
  playground: {
    settings: {
      'editor.theme': 'light',
      'editor.cursorShape': 'line'
    },
  }
});


const port = process.env.PORT || 4001;
server.listen({ port }).then(({ url }) => {
  console.log(`🚀  ${url}`);
});
