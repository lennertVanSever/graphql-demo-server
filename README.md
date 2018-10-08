# GraphQL demo step 1

## Setup ES6
`npm init -y`

`npm install nodemon babel-cli babel-preset-env -D`

create .babelrc file with content
```
{
  "presets": ["env"]
}
```

Add start script to package json 
`"start": "nodemon index.js --exec babel-node",`

## Setup GraphQL + apollo
`npm install apollo-server graphql apollo-server-express --save`

1. Create folder named `data` in root
2. Create a file in the data folder named `schema.js`
3. Create the following minimal schema 
```
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Author {
    first_name: String
    Posts: [Post]
  }

  type Post {
    title: String
    Author: Author
  }

  type Query {
    posts: [Post]
  }
`;

module.exports = {
  typeDefs
}
```
4. Create another file in the data folder named `resolvers.js`
5. Resolve your schema with the following code
```
const resolvers = {
  Post: {
    Author(){
      return {
        first_name: "lennert"
      }
    }
  },
  Query: {
    posts: () => {
      return [{
        title: "my post"
      }];
    }
  }
}

module.exports = {
  resolvers
}
```
6. Create in your root directory an `index.js` file
7. Setup the apollo server with the following code
```
import { ApolloServer } from 'apollo-server';

import { resolvers } from './data/resolvers';
import { typeDefs } from './data/schema';


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


const port = process.env.PORT || 4000;
server.listen({ port }).then(({ url }) => {
  console.log(`🚀  ${url}`);
});
```
8. Visit localhost:4000 to try out your first queries!
Example:
```
query{
  posts{
    title
    Author{
      first_name
    }
  }
}
```

