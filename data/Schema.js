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
  
  type Participant {
    Author: Author
    Conversation: Conversation
    is_typing: Boolean
  }

  type Conversation {
    id: Int
    Participants: [Participant!]!
    Messages: [Message]
  }

  type Message {
    id: Int
    Author: Author
    Conversation: Conversation
    text: String
  }

  type Query {
    posts: [Post]
    author(id: Int!): Author
    conversation(id: Int!): Conversation
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

  input InputMessage {
    text: String!
    author_id: Int!
    conversation_id: Int!
  }

  type Mutation {
    addComment(Comment: InputComment): Comment
    addPost(Post: InputPost): Post
    addMessage(Message: InputMessage): Message
  }

  type Subscription {
    messageAdded: Message
  }
`;

module.exports = {
  typeDefs
}
