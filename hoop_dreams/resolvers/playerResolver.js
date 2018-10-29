module.exports = {
    queries: {
        allPlayers: () => {
            return Player.find();
        },
        player: (parent, args) => {
            return Player.findById(args.id);
        }
    },
    mutations: {
        createPlayer: (parent, args) => {
            const {name} = args.input;

            var newPlayer = new Player();
            newPlayer.name = name;


            const player = Player.findOneAndUpdate(
                {"_id" : args.id },
                { $set: {"name" : args.name} }
            );
            return player;
        },
        removePlayer: (parent, args) => {
            Player.findOneAndDelete(
                {"_id" : args.id }, 
                (err, player) => {
                    if(err) return false;
                });
            return true;
        }
    }
}