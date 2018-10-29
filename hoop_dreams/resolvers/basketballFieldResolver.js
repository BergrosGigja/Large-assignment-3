const { BasketballField } = require('../data/db');
const { NotFoundError } = require('../errors');

module.exports = {
    queries: {
        allBasketballFields: (parent, args,  { service } ) => new Promise((resolve, reject) => {
            const { status } = args;

            if(status) { 
                // Only show basketball fields with requested status(OPEN or CLOSED)
                service.getAllBasketballFields().then((allBasketballFields, err, field) => {
                    if(err) reject( new NotFoundError );
                    resolve(allBasketballFields.data.filter(b => b.status === status));
                })
            } else {
                // Declared that status is an optional parameter in getAllBasketBallFields,
                // If no status is provided(OPEN or CLOSED fields), return all fields
                service.getAllBasketballFields().then((allBasketballFields, err, field) => {
                    if(err) reject( new NotFoundError );
                    resolve(allBasketballFields.data);
                })
            }              
        }),

        basketballField: (parent, args, { service } ) => new Promise((resolve, reject) => {
            const { id } = args;

            if (id != "") {
                service.getBasketballFieldById(id).then((allBasketballFields, err, field) => {
                    resolve(allBasketballFields.data);
                }).catch(err => { reject( new NotFoundError)} )
            } else {
                reject( new NotFoundError );
            }  
        }),
        }

}

