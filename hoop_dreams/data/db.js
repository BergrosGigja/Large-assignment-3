const mongoose = require('mongoose');
const BasketballFieldSchema = require('../mongooseSchemas/basketballFieldSchema');
const pickupGameSchema = require('../mongooseSchemas/pickupGameSchema');
const playerSchema = require('../mongooseSchemas/playerSchema');
const signupSchema = require('../mongooseSchemas/signupSchema');

const connection = mongoose.createConnection('mongodb://user:u5erpassword@ds141783.mlab.com:41783/large-assignment-3', {
    useNewUrlParser: true
});

mongoose.set('useFindAndModify', false);

module.exports = {
    BasketballField: connection.model('BasketballField', BasketballFieldSchema),
    PickupGame: connection.model('PickupGame', pickupGameSchema),
    Player: connection.model('Player', playerSchema),
    Signup: connection.model('Signup', signupSchema),
    connection
};