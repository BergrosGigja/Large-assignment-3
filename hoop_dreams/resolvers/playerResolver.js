const { Player } = require('../data/db');

module.exports = {
    queries: {
        allPlayers: () => {
            return Player.find();
        },
        player: (parent, args) => {
            return Player.findById(args.id);
        }
    }
}