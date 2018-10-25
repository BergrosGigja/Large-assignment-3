const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://user:u5erpassword@ds141783.mlab.com:41783/large-assignment-3', {
    useNewUrlParser: true
});

module.exports = {
    connection
};