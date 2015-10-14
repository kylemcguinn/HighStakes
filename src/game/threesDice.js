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
    calculateScore: function(player){
        var score = 0;

        ArrayUtility.forEach(player.dice, function(die){
            var value = die.diceValue ? die.diceValue : 0;
            score += value == 3 ? 0 : value;
        });

        player.score = score;

        return score;
    },
    computerTurn: function(player){

        rollCpuDice(this, player);

    },
    rollDice: function(player){
        var selectedCount = 0;
        var diceCount = 0;
        var self = this;
        ArrayUtility.forEach(player.dice, function(value){
            if (value.initialSelection){
                selectedCount++;
            }
            if (value.diceValue){
                diceCount++;
            }
        });

        var canRoll = !(diceCount > 0 && this.selectionMin && selectedCount < this.selectionMin);

        ArrayUtility.forEach(player.dice, function(value){
            if (canRoll) {
                value.rollDice();
            }
        });

        waitForDice(player.dice, function(){
            self.calculateScore(player);
            var event = new cc.EventCustom("update_score");
            cc.eventManager.dispatchEvent(event);
        }, 500);
    }
};

var waitForDice = function(dice, callback, timeout){
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
        }, timeout);
    }
};

var selectDice = function(game, player){
    var minDie = null;
    var highlighted = false;
    var selectedCount = 0;
    ArrayUtility.forEach(player.dice, function(value){
        if (value.highlight){
            selectedCount++;
        }
        else if (value.diceValue == 3){
            value.setHighlighted();
            highlighted = true;
            selectedCount++;
        } else if (minDie == null || value.diceValue < minDie.diceValue) {
            minDie = value;
        }
    });

    if (!highlighted && selectedCount < game.maxRolls){
        minDie.setHighlighted();
        selectedCount++;
    }

    if (selectedCount < game.maxRolls){
        setTimeout(function(){
            rollCpuDice(game, player);
        }, 1000);
    }
};

var rollCpuDice = function(game, player){
    game.rollDice(player);

    waitForDice(player.dice, function() {
        setTimeout(function(){
            selectDice(game, player, 1000);
        }, 1000);
    });
};