const { ApolloServer } = require('apollo-server');
const connect = require('./config/db');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const models = require('./models');

connect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
});

server.listen({ port: process.env.PORT || 4000 });