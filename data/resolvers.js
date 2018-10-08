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