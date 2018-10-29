const { ServerError, NotFoundError, BadRequest } = require('../errors');

module.exports = {
    queries: {
        allPlayers: (parent, args, context) => new Promise((resolve, reject) => {
            const {Player} = context;

            Player.find({}, (err, players) => {
                if(err) reject(new ServerError);
                resolve(players);
            });
        }),
        player: (parent, args, context) => new Promise((resolve, reject) => {
            const {Player} = context;

            Player.findById({"_id": args.id}, (err, player) => {
                if(err) reject(new ServerError);
                else if(!player) reject(new NotFoundError);
                resolve(player);
            });
        })
    },
    mutations: {
        createPlayer: (parent, args, context) => new Promise((resolve, reject) => {
            const {Player} = context;
            const {name} = args.input;

            if(name.length == 0) reject(new BadRequest);
            var newPlayer = new Player();
            newPlayer.name = name;

            Player.create(newPlayer, (err, player) => {
                    if(err) reject(new ServerError);
                    resolve(newPlayer);
            });
        }),
        updatePlayer: (parent, args, context) => new Promise((resolve, reject) => {
            const {Player} = context;

            Player.findOneAndUpdate({"_id" : args.id}, {$set:{"name" : args.name}}, {new:true}, (err, player) => { 
                if(err) reject(new ServerError);
                if(!player) reject(new NotFoundError);
                resolve(player);
            });
        }),
        removePlayer: (parent, args, context) => new Promise((resolve, reject) => {
            const {Player, PickupGame, Signup} = context;
            //TODO: check id correct, remove relations in signup, pickupgames
            Player.findOneAndDelete({"_id" : args.id }, (err, player) => {
                if(err) reject(new ServerError);
                if(!player) reject(new NotFoundError);
                resolve(true);
            });
        })
    },
    types: {
        Player: {
            playedGames: (parent, args, context) => new Promise((resolve, reject) => {
                const {Signup, PickupGame} = context;

                const pickupGameIds = [];
                Signup.find({playerId: parent}, (err, signups) => {
                    if(err) reject(new ServerError);
                    else if (!signups) resolve([]);
                    signups.find(s => pickupGameIds.push(s.pickupGameId));
                    PickupGame.aggregate([{ $match: {_id: {$in: pickupGameIds}}}], (err, pickupGames) => {
                        if(err) reject(new ServerError);
                        pickupGames.map(pg => pg.id = pg._id.toString());
                        resolve(pickupGames);
                    })
                });
            })
        }
    }
}