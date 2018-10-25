const ApolloServer = require('apollo-server');

const server = new ApolloServer ({
    //typedefs
    //resolvers
});

server.listen()
    .then (({ url }) => console.log('GraphQL API running on ${url}'))