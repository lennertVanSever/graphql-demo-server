import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Author {
    first_name: String
    last_name: String
    email: String
    Posts: [Post]
  }

  type Post {
    title: String
    description: String
    Comments: [Comment]
    Author: Author
  }

  type Comment {
    Post: Post
    Author: Author
    description: String
    likes: Int
  }

  type Query {
    posts: [Post]
    author(id: Int!): Author
  }
`;

module.exports = {
  typeDefs
}
