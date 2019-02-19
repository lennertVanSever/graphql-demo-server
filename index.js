import { gql, ApolloServer } from 'apollo-server';
import { find, filter } from 'lodash';


const typeDefs = gql`
  type Post {
    title: String
    description: String
    Author: Author
  }

  type Author {
    first_name: String
    last_name: String
    Posts: [Post]
  }

  type Query {
    posts: [Post]
  }
`;

const authorData = [
  {
    first_name: "John",
    last_name: "Doe",
    id: 1,
  },
  {
    first_name: "Joe",
    last_name: "Bloggs",
    id: 2,
  }
];

const postData = [
  {
    title: "This presentation is awesome",
    description: "Amet veniam ex minim exercitation adipisicing nulla excepteur ex ipsum fugiat amet ex.",
    author_id: 1,
  },
  {
    title: "What's wrong with REST?",
    description: "Amet veniam ex minim exercitation adipisicing",
    author_id: 2,
  },
  {
    title: "Nothing wrong with REST, just a different solution",
    description: "Amet veniam ex minim exercitation adipisicing",
    author_id: 1,
  },
];

const resolvers = {
  Query: {
    posts: () => postData,
  },
  Post: {
    Author(post){
      return find(authorData, {id: post.author_id});
    }
  },
  Author: {
    Posts(author){
      return filter(postData, {author_id: author.id});
    }
  },
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: { 
    settings: {
      'editor.theme': 'light',
      'editor.cursorShape': 'line'
    },
  }
});

const port = process.env.PORT || 4001;
server.listen({ port }).then(({ url }) => {
  console.log(`🚀 ${url}`);
});
