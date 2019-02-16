import { gql } from 'apollo-server-express';


const typeDefs = gql`
  type Author {
    first_name: String
    last_name: String
    Posts: [Post]
  }

  type Post {
    title: String
    description: String
    Author: Author
  }

  type Query {
    posts: [Post]
  }
`;

module.exports = {
  typeDefs
}
