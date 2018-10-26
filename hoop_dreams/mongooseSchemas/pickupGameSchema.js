const Schema = require('mongoose').Schema;

module.exports = new Schema({
    start: { type: String, required: true  },
    end: { type: String, required: true  },
    location: { type: Schema.Types.ObjectId, required: true, ref: "BasketballField"},
    host: { type: Schema.Types.ObjectId, required: true, ref: "Player" }
});