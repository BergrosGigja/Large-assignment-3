const { BasketballField } = require('../data/db');

module.exports = {
    queries: {
        allBasketballFields: (parent, args, context) => {
            const { status } = args;
            const {basketballFieldService} = context;
            //TODO: fix so it only shows those with requested status
            return BasketballField.find();
        },
        basketballField: (parent, args) => {
            return BasketballField.findById(args.id);
        }
    }
    
}