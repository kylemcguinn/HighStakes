/**
 * Created by Kyle on 8/4/2015.
 */
var GameManager = {
    game: null,
    dice: [],
    rollDice: function(){
        var selectedCount = 0;
        var diceCount = 0;
        ArrayUtility.forEach(this.dice, function(value){
            if (value.initialSelection){
                selectedCount++;
            }
            if (value.diceValue){
                diceCount++;
            }
        });

        if (diceCount > 0 && this.game.selectionMin && selectedCount < this.game.selectionMin){
            return;
        }

        var event = new cc.EventCustom("game_roll_dice");
        cc.eventManager.dispatchEvent(event);
    }
};