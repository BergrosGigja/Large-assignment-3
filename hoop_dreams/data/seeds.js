let Moment = require('moment');

const { PickupGame, Player, BasketballField, Signup, connection } = require('./db');

const getResourceIdByName = (resources, prop, value) => resources.find(elem => elem[prop] === value);

//Drop all collections before execution
Object.keys(connection.collections).forEach(collection => {
    if (collection === 'signup') { Signup.collection.drop(); }
    if (collection === 'pickupgames') { PickupGame.collection.drop(); }
    if (collection === 'players') { Player.collection.drop(); }
    if (collection === 'basketballfields') { BasketballField.collection.drop(); }
});

BasketballField.insertMany([
    {
        name: "Reykjavik City Center",
        capacity: 50,
        yearOfCreation: new Moment('2012-01-01 08:00'),
        status: "OPEN"
    },
    {
        name: "Hafnarfjordur City Center",
        capacity: 80,
        yearOfCreation: new Moment('2008-10-01 10:00'),
        status: "CLOSED"
    }
], err => {
    if(err) { throw new Error(err); }
    BasketballField.find({}, (err, basketballFields) => {
        if(err) {throw new Error(err); }

        // Insert Players
        Player.insertMany([
            {
                name: "Player 1"
            },
            {
                name: "Player 2"
            },
            {
                name: "Player 3"
            },
            {
                name: "Player 4"
            },
            {
                name: "Player 5"
            }
        ], err => {
            if(err) { throw new Error(err); }
            Player.find({}, (err, players) => {
                if(err) { throw new Error(err); }

                // Insert PickupGames
                PickupGame.insertMany([
                    {
                        start: new Moment('2017-01-05 20:30'),
                        end: new Moment('2017-01-05 21:45'),
                        location: getResourceIdByName(basketballFields, 'name', "Reykjavik City Center"),
                        host: getResourceIdByName(players, 'name', "Player 1")
                    },
                    {
                        start: new Moment('2018-01-05 20:30'),
                        end: new Moment('2018-01-05 21:45'),
                        location: getResourceIdByName(basketballFields, 'name', "Reykjavik City Center"),
                        host: getResourceIdByName(players, 'name', "Player 2")
                    },
                    {
                        start: new Moment('2019-01-05 20:30'),
                        end: new Moment('2019-01-05 21:45'),
                        location: getResourceIdByName(basketballFields, 'name', "Reykjavik City Center"),
                        host: getResourceIdByName(players, 'name', "Player 3")
                    }
                ], err => {
                    if(err) { throw new Error(err); }
                    PickupGame.find({}, (err, pickupGames) => {
                        if(err) { throw new Error(err); }

                        // Insert Signups
                        Signup.insertMany([
                            {
                                playerId: getResourceIdByName(players, 'name', "Player 1"),
                                pickupGameId: pickupGames[0].location
                            },
                            {
                                playerId: getResourceIdByName(players, 'name', "Player 2"),
                                pickupGameId: pickupGames[0].location
                            }
                        ], err => {
                            if(err) { throw new Error(err); }
                            Signup.find({}, (err, signups) => {
                                if(err) { throw new Error(err); }
                                connection.close();
                            });
                        });
                    });
                });
            });
        });
    });
});