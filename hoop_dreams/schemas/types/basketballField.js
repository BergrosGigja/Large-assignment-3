module.exports = `
  type BasketballField {
    id: ID!
    name: string!
    capacity: int!
    yearOfCreation: Moment!
    pickupGames: [pickupGame!]!
    status: BasketballFieldStatus!
  }
`;