var game = require("../src/game");

//describe("Ending the game", function() {
//    it("should save the game to disk", function(){
//
//        game.endGame();
//
//        expect(game.status).toBe("completed");
//    }),
//
//    it("should have a game status of completed", function(){
//
//
//        game.endGame();
//
//        expect(game.status).toBe("completed");
//    })
//});


describe('When creating a new game', function() {

    beforeEach(function()
    {
        console.log('called before each.');
    });

    afterEach(function(){
        console.log('called after each.')

    });

    it("should have a state of waiting for player2", function(){
        game.createGame();
        expect(game.state).toBe('Waiting for player 2.');
    })
});


 
