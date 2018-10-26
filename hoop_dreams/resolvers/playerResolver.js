const { Player } = require('../data/db');

module.exports = {
    queries: {
        allPlayers: () => {
            Player.find({}, (err, players) => {});
        },
        player: () => {
            return null;
        }
    }
}