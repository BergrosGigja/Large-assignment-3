const Schema = require('mongoose').Schema;

module.exports = new Schema({
    playerId: { type: Schema.Types.ObjectId, required: true, ref: "Player" },
    pickupGameId: { type: Schema.Types.ObjectId, required: true, ref: "PickupGame" }
});