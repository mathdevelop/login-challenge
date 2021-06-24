const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    name: String!
    email: String!
  }

  type Query {
    user(email: String!, password: String!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
  }
`;