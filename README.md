# Hoop Dreams :basketball:
## Large Assignment 3 for T-514-VEFT

A group of enthusiastic basketball fans regularly play basketball with each other. After years of
always having to call everyone to play a basketball game of pickup they are beginning to find this
method rather annoying. This group has come to us and want us to create a GraphQL API which
can deliver data to make it easier to find and collect players to a basketball pickup game. This is
where we come in! Because of our exceptional GraphQL skills and attention to detail we are the
right ones for the job!

## Rules
- Pickup games cannot be added to a basketball field which has a status of closed
- Pickup games cannot overlap if they are being played in the same basketball field
- Players cannot be added to pickup games that have already passed
- Players cannot be added to pickup games, if the maximum capacity has been reached for that basketball field
- Players cannot be removed from pickup games that have already passed
- A query or mutation which accepts an id as a field argument must check whether the resource with the provided id exists
- All input types which contain ids that point to certain resources should validate the ids

# Assignment description
Below is a description of the functionality the GraphQL API should contain. For all reference on
how the schema should be setup, look at the Schema section below

### Queries
- [ ] allBasketballFields - Should return a collection of all basketball fields. Contains a field argument called 
  status which is of type BasketballFieldStatus (enum) and should be used to filter the data based on the status 
  of the basketball field
- [ ] allPickupGames - Should return a collection of all pickup games
- [ ] allPlayers - Should return a collection of all players
- [ ] basketballField - Should return a specific basketball field by id
- [ ] pickupGame - Should return a specific pickup game by id
- [ ] player - Should return a specific player by id

### Mutations
- [ ] createPickupGame - Creates a pickup game
- [ ] createPlayer - Create a player
- [ ] updatePlayer - Updates a player
- [ ] removePickupGame - Remove a pickup game
- [ ] removePlayer - Remove a player
- [ ] addPlayerToPickupGame - Adds a player to a specific pickup game
- [ ] removePlayerFromPickupGame - Removes a player from a specific pickup game

### Schema
Types
  - BasketballField
    - id : ID*
    - name : string*
    - capacity : int*
    - yearOfCreation : Moment*
    - pickupGames An array of PickupGame
    - status: BasketballFieldStatus*
  - PickupGame
    - id : ID*
    - start : Moment*
    - end : Moment*
    - location : BasketballField*
    - registeredPlayers : An array of Player
    - host : Player*
  - Player
    - id : ID*
    - name : string*
    - playedGames : An array of PickupGame
Input types
  - BasketballFieldInput
    - name : string*
    - capacity : int*
    - yearOfCreation : Moment*
    - status : BasketballFieldStatus*
  - PickupGameInput
    - start : Moment*
    - end : Moment*
    - basketballFieldId : int*
    - hostId : int*
  - PlayerInput
    - name : string*
  - SignupPlayerInput
    - playerId : int*
    - pickupGameId : int*
Custom scalar types
  - Moment
Enum types
  - BasketballFieldStatus
    - OPEN
    - CLOSED

### Folder structure
	hoop_dreams/
		schemas/
			input/
			mutations/
			queries/
			scalar/
			types/
			enums/
			index.js
		resolvers/
			basketballFieldResolver.js
			pickupGameResolver.js
			playerResolver.js
			index.js
		data/
			db.js
		services/
			basketballFieldService.js
			index.js
