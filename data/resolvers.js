import { connection } from './connection';
import loaders from './loaders';
import Mutation from './mutations';

const resolvers = {
  Post: {
    Author({author_id}){
      return loaders.authorLoader.load(author_id).then(result => result[0]);
    },
    Comments({id}){
      return loaders.commentLoader.load(id);
    }
  },
  Author: {
    Posts({id}){
      return loaders.postLoaderByAuthor.load(id);
    }
  },
  Comment: {
    Post({post_id}){
      return loaders.postLoader.load(post_id).then(result => result[0]);
    },
    Author({author_id}){
      return loaders.authorLoader.load(author_id).then(result => result[0]);
    }
  },
  Query: {
    posts: () => {
      console.log("starting loading data");
      return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM graphql_demo.post ORDER BY id DESC", (error, {rows}) => {
          if(error) reject(error);
          resolve(rows);
        })
      })
    },
    author: (root, {id}) => loaders.authorLoader.load(id).then(result => result[0])
  },
  Mutation
}

module.exports = {
  resolvers
}