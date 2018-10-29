const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const database = require('./data/db');
const basketballFieldService = require('./services/basketballFieldService')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        db: database,
        service: basketballFieldService
    }
});

server.listen()
    .then(({ url }) => console.log(`GraphQL Service is running on ${ url }`));