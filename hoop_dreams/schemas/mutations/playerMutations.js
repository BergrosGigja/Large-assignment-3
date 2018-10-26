module.exports = `
  createPlayer(input: PlayerInput!): Player!
  updatePlayer(id: ID!, name: String!): Player!
  removePlayer(id: ID!): Boolean!
`;