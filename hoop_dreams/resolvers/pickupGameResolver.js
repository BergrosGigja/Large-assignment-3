const { PickupGame } = require('../data/db');

module.exports = {
    queries: {
        allPickupGames: () => {
            return PickupGame.find();
        },
        pickupGame: (parent, args) => {
            return PickupGame.findById(args.id);
        }
    }
}