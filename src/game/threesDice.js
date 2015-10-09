/**
 * Created by Kyle on 8/3/2015.
 */
var ThreesDice = {
    name: 'Threes Dice',
    diceNum: 5,
    maxRolls: 5,
    canDeselect: false,
    lowValueWins: true,
    selectionMin: 1,
    calculateScore: function(dice){
        var score = 0;

        ArrayUtility.forEach(dice, function(value){
            score += value == 3 ? 0 : value;
        });

        return score;
    },
    computerTurn: function(player){
        this.rollDice(player);

        setTimeout(function(){
            waitForDice(player.dice, function(){
                player.dice[0].setHightlighted();
            });
        }, 1000);
    },
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

        var canRoll = !(diceCount > 0 && this.selectionMin && selectedCount < this.selectionMin);

        var diceValues = [];

        ArrayUtility.forEach(player.dice, function(value){
            if (canRoll) {
                value.rollDice();
            }

            diceValues.push(value.diceValue);
        });

        return this.calculateScore(diceValues);
    }
};

var waitForDice = function(dice, callback){
    var isDone = true;
    ArrayUtility.forEach(dice, function(value){
        if (value.getNumberOfRunningActions() > 0){
            isDone = false;
        }
    });

    if (isDone){
        callback();
    }
    else{
        setTimeout(function(){
            waitForDice(dice, callback);
        }, 1000);
    }
};