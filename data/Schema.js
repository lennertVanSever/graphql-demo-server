import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Author {
    id: Int
    first_name: String
    last_name: String
    email: String
    Posts: [Post]
  }

  type Post {
    id: Int
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

  input InputComment {
    description: String!
    author_id: Int!
    post_id: Int!
  }

  input InputPost {
    title: String!
    description: String!
    author_id: Int!
  }

  type Mutation {
    addComment(Comment: InputComment): Comment
    addPost(Post: InputPost): Post
  }
`;

module.exports = {
  typeDefs
}
