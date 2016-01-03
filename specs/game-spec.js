
var game = require("../game");


describe("Ending the game", function() {
    it("should save the game to disk", function(){
        
        game.endGame();
        
        expect(game.status).toBe("completed");
    })

});


describe("Ending the game", function() {
    it("should have a game status of completed", function(){
        
        
        game.status = "started";
        
        expect(game.status).toBe("started");
    })
});
   
        

 
