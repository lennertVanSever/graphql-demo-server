
import { connection } from './connection';
import loaders from './loaders';
import Mutation from './mutations';



const resolvers = {
  Post: {
    Author({ author_id }) {
      return loaders.authorLoader.load(author_id).then(result => result[0]);
    },
    Comments({ id }) {
      return loaders.commentLoader.load(id);
    }
  },
  Author: {
    Posts({ id }) {
      return loaders.postLoaderByAuthor.load(id);
    }
  },
  Comment: {
    Post({ post_id }) {
      return loaders.postLoader.load(post_id).then(result => result[0]);
    },
    Author({ author_id }) {
      return loaders.authorLoader.load(author_id).then(result => result[0]);
    }
  },
  Participant: {
    Author({ author_id }) {
      return loaders.authorLoader.load(author_id).then(result => result[0]);
    }
  },
  Message: {
    Author({ author_id }) {
      return loaders.authorLoader.load(author_id).then(result => result[0]);
    }
  },
  Conversation: {
    Participants({ id }) {
      return new Promise((resolve, reject) => {
        const query = {
          text: "SELECT * FROM graphql_demo.conversation_participant WHERE conversation_id = $1",
          values: [id]
        }
        connection.query(query, (error, { rows }) => {
          if (error) reject(error);
          else {
            resolve(rows);
          }
        });
      });
    },
    Messages({ id }) {
      return new Promise((resolve, reject) => {
        const query = {
          text: "SELECT * FROM graphql_demo.message WHERE conversation_id = $1",
          values: [id]
        }
        connection.query(query, (error, { rows }) => {
          if (error) reject(error);
          else {
            resolve(rows);
          }
        });
      });
    }
  },
  Query: {
    posts: () => {
      return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM graphql_demo.post ORDER BY id DESC", (error, { rows }) => {
          if (error) reject(error);
          resolve(rows);
        })
      })
    },
    author: (root, { id }) => loaders.authorLoader.load(id).then(result => result[0]),
    conversation: (root, { id }) => {
      return new Promise((resolve, reject) => {
        const query = {
          text: "SELECT * FROM graphql_demo.conversation WHERE id = $1",
          values: [id]
        }
        connection.query(query, (error, { rows }) => {
          if (error) reject(error);
          else {
            resolve(rows[0]);
          }
        });
      });
    }
  },
  Subscription: Mutation.Subscription,
  Mutation: Mutation.Mutation
}

module.exports = {
  resolvers
}