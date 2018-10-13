import { connection } from './connection';
import loaders from './loaders';

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
      return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM graphql_demo.post", (error, {rows}) => {
          if(error) reject(error);
          resolve(rows);
        })
      })
    }
  }
}

module.exports = {
  resolvers
}