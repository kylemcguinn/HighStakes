/**
 * Created by Kyle on 8/4/2015.
 */
var GameManager = {
    game: null,
    players: [],
    rollDice: function(player){
        this.game.rollDice(player);
    },
    nextTurn: function(player){
        return this.game.computerTurn(player);
    }
};

