/**
 * Created by Kyle on 8/4/2015.
 */
var GameManager = {
    game: null,
    players: [],
    rollDice: function(player){
        var selectedCount = 0;
        var diceCount = 0;
        ArrayUtility.forEach(player.dice, function(value){
            if (value.initialSelection){
                selectedCount++;
            }
            if (value.diceValue){
                diceCount++;
            }
        });

        var canRoll = !(diceCount > 0 && this.game.selectionMin && selectedCount < this.game.selectionMin);

        var diceValues = [];

        ArrayUtility.forEach(player.dice, function(value){
            if (canRoll) {
                value.rollDice();
            }

            diceValues.push(value.diceValue);
        });

        var score = GameManager.game.calculateScore(diceValues);

        return score;
    }
};