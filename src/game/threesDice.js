/**
 * Created by Kyle on 8/3/2015.
 */
var ThreesDice = {
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
    }
};