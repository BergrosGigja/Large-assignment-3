const Schema = require('mongoose').Schema;

module.exports = new Schema({
    id: { type: int, required: true },
    name: { type: String, required: true },
    capacity: { type: int, required: true },
    yearOfCreation: { type: String, required: true },
    status: { type: String, required: true }
});