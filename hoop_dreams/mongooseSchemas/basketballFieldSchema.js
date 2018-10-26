const Schema = require('mongoose').Schema;

module.exports = new Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    yearOfCreation: { type: String, required: true },
    pickupGames: [{ type: Schema.Types.ObjectId, ref: "PickupGame" }],
    status: { type: String, required: true }
});