const { ServerError, NotFoundError, BadRequest } = require('../errors');

module.exports = {
    queries: {
        allPickupGames: (parent, args, context) => new Promise((resolve, reject) => {
            const {PickupGame} = context;

            PickupGame.find({}, (err, pickupGames) => {
                if(err) reject(new ServerError);
                resolve(pickupGames);
            });
        }),
        pickupGame: (parent, args, context) => new Promise((resolve, reject) => {
            const {PickupGame} = context;

            PickupGame.findById({"_id": args.id}, (err, pickupGame) => {
                if(err) reject(new ServerError);
                else if(pickupGame == null) reject(new NotFoundError);
                resolve(pickupGame);
            });
        })
    },
    mutations: {
        createPickupGame: (parent, args, context) => new Promise((resolve, reject) => {
            const {PickupGame, Player, BasketballField} = context;
            const {start, end, basketballFieldId, hostId} = args.input;

            if((start || end || basketballFieldId || hostId) == null) reject(new BadRequest);
            
            //Check if player exists
            Player.findById({"_id": hostId}, (err, player) => {
                if(err) reject(new ServerError);
                else if(!player) reject(new NotFoundError);
            });

            //Check if field exists
            BasketballField.findById({"_id": basketballFieldId}, (err, basketballField) => {
                if(err) reject(new ServerError);
                else if(!basketballField) reject(new NotFoundError);
            });

            var newPickupGame = new PickupGame();
            newPickupGame = {
                start: start,
                end: end,
                location: basketballFieldId,
                host: hostId
            }

            PickupGame.create(newPickupGame, (err, pickupGame) => {
                if(err) reject(new ServerError);
                resolve(newPickupGame);
            });
        }),
        removePickupGame: (parent, args, context) => new Promise((resolve, reject) => {
            const {Player, PickupGame, Signup} = context;
            //TODO: check id correct, remove relations in signup, players
            PickupGame.findOneAndDelete({"_id" : args.id }, (err, pickupGame) => {
                if(err) reject(new ServerError);
                if(!pickupGame) reject(new NotFoundError);
                resolve(true);
            });
        }),
        addPlayerToPickupGame: (parent, args, context) => new Promise((resolve, reject) => {
            const {Player, PickupGame, Signup} = context;
            const {playerId, pickupGameId} = args.input;

            if((playerId || pickupGameId) == null) reject(new BadRequest);

            //Check if player exists
            Player.findById({"_id": playerId}, (err, player) => {
                if(err) reject(new ServerError);
                else if(!player) reject(new NotFoundError);
            });

            //Check if pickupGame exists and host is not the player
            var game = PickupGame.findById({"_id": pickupGameId}, (err, pickupGame) => {
                if(err) reject(new ServerError);
                else if(!pickupGame) reject(new NotFoundError);
                else if(pickupGame.hostId == playerId) reject(new BadRequest);
                //else if(pickupGame.registeredPlayers.length + 1) check if more than capacity
            });

            var newSignup = new Signup();
            newSignup = {
                playerId: playerId,
                pickupGameId: pickupGameId
            }

            PickupGame.findOneAndUpdate({"_id" : pickupGameId}, {$push:{"registeredPlayers" : playerId}}, (err, pickupGame) => { 
                if(err) reject(new ServerError);
            });

            Player.findOneAndUpdate({"_id" : playerId}, {$push:{"playedGames" : pickupGameId}}, (err, player) => { 
                if(err) reject(new ServerError);
            });

            Signup.create(newSignup, (err, signup) => {
                if(err) reject(new ServerError);
                resolve(game);
            });
        })
    },
    types: {
        PickupGame: {
            registeredPlayers: (parent, args, context) => new Promise((resolve, reject) => {
                const {Signup, Player} = context;

                const playerIds = [];
                Signup.find({pickupGameId: parent}, (err, signups) => {
                    if(err) reject(new ServerError);
                    else if (!signups) resolve([]);
                    signups.find(s => playerIds.push(s.playerId));
                    Player.aggregate([{ $match: {_id: {$in: playerIds}}}], (err, players) => {
                        if(err) reject(new ServerError);
                        players.find(p => p.id = p._id.toString());
                        resolve(players);
                    })
                });
            })
        }
    }
}