const { BasketballField } = require('../data/db');

module.exports = {
    queries: {
        allBasketballFields: (parent, args,  { service } ) => new Promise((resolve, reject) => {
            //Only show basketball fields with requested status
            const { status } = args;
            if(status) { 
                service.getAllBasketballFields().then((allBasketballFields) => {
                    resolve(allBasketballFields.data.filter(b => b.status === status));
                })
            } else {
                const reason = new Error('No basketball field for you  my friend');
                reject(reason);
            }
                
        }),

        basketballField: (parent, args) => {
            return BasketballField.findById(args.id);
        }
    }

}

