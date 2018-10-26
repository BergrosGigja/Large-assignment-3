const { BasketballField } = require('../data/db');

module.exports = {
    queries: {
        allBasketballFields: (parent, args) => {
            const { status } = args;
            //TODO: fix so it only shows those with requested status
            return BasketballField.find();
        },
        basketballField: (parent, args) => {
            return BasketballField.findById(args.id);
        }
    }
}