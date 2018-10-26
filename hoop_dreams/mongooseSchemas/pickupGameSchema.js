const Schema = require('mongoose').Schema;

module.exports = new Schema({
    id: { type: Schema.Types.ObjectId, required: true },
    start: { type: String, required: true  },
    end: { type: String, required: true  },
    location: { type: Schema.Types.ObjectId, required: true, ref: "BasketballField"},
    playedGames: [{ type: Schema.Types.ObjectId, required: true, ref: "PickupGame"}],
    host: { type: Schema.Types.ObjectId, required: true, ref: "Player" }
});