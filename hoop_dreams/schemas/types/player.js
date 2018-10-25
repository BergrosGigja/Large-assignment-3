module.exports = `
  type Player {
    id: ID!
    name: string!
    playedGames: [PickupGame!]!
  }
`;