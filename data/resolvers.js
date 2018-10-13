import { connection } from './connection';
import { cpus } from 'os';

const resolvers = {
  Post: {
    Author({author_id}){
      return new Promise((resolve, reject) => {
        const query = {
          text: "SELECT * FROM graphql_demo.author where id = $1",
          values: [author_id]
        }
        connection.query(query, (error, {rows}) => {
          if(error) reject(error);
          resolve(rows[0]);
        })
      })
    },
    Comments({id}){
      return new Promise((resolve, reject) => {
        const query = {
          text: "SELECT * FROM graphql_demo.comment where post_id = $1",
          values: [id]
        }
        connection.query(query, (error, {rows}) => {
          if(error) reject(error);
          resolve(rows);
        })
      })
    }
  },
  Author: {
    Posts({id}){
      return new Promise((resolve, reject) => {
        const query = {
          text: "SELECT * FROM graphql_demo.post where author_id = $1",
          values: [id]
        }
        connection.query(query, (error, {rows}) => {
          if(error) reject(error);
          resolve(rows);
        })
      })
    }
  },
  Comment: {
    Post({post_id}){
      return new Promise((resolve, reject) => {
        const query = {
          text: "SELECT * FROM graphql_demo.post where id = $1",
          values: [post_id]
        }
        connection.query(query, (error, {rows}) => {
          if(error) reject(error);
          resolve(rows[0]);
        })
      })
    },
    Author({author_id}){
      return new Promise((resolve, reject) => {
        const query = {
          text: "SELECT * FROM graphql_demo.author where id = $1",
          values: [author_id]
        }
        connection.query(query, (error, {rows}) => {
          if(error) reject(error);
          resolve(rows[0]);
        })
      })
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
    },
    author: (root, {id}) => {
      return new Promise((resolve, reject) => {
        const query = {
          text: "SELECT * FROM graphql_demo.author where id = $1",
          values: [id]
        }
        connection.query(query, (error, {rows}) => {
          if(error) reject(error);
          resolve(rows[0]);
        })
      })
    }
  }
}

module.exports = {
  resolvers
}