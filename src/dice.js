var Dice = {
    getDice: function(layer, diceSet) {
        var dice = new cc.Sprite("#" + diceSet + "1.png");

        var diceRoll = function(){

            var numberOfActions = dice.getNumberOfRunningActions();

            if (numberOfActions > 0)
                return;

            // Calculate dice roll
            var diceRoll = Math.floor((Math.random() * 6) + 1);

            // Randomly select number of repeats for dice animation
            var repeat = Math.floor((Math.random() * 3) + 1);
            //var repeat = 1;

            // Set dice value
            dice.diceValue = diceRoll == 1 ? 6 : diceRoll - 1;

            // Add full set of dice frames for initial roll(s)
            var animFrames = [];
            for (var i = 1; i < 7; i++) {
                var str = diceSet + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                animFrames.push(frame);
            }

            // Create roll animation and set repeat amount
            var animation = new cc.Animation(animFrames, 0.2);
            var action1 = new cc.Repeat(new cc.Animate(animation), repeat);

            // Create animation for ending dice roll
            animFrames = [];
            for (i = 1; i < diceRoll; i++) {
                str = diceSet + i + ".png";
                frame = cc.spriteFrameCache.getSpriteFrame(str);
                animFrames.push(frame);
            }

            animation = new cc.Animation(animFrames, 0.2);
            var action2 = new cc.Repeat(new cc.Animate(animation), 1);

            // Run the full dice animation sequence
            dice.runAction(cc.sequence(action1, action2));
        };

        // Listen for touch event on this die and highlight/un-highlight accordingly
        SpriteUtility.setTouchListener(dice, function(){
            if (!dice.highlight && dice.diceValue) {
                dice.setHighlighted();
            }
            else if (!dice.selectionLocked){
                layer.removeChild(dice.highlight);
                dice.highlight = null;
                dice.initialSelection = false;
            }
        });

        // Add highlight sprite to this die
        dice.setHighlighted = function(){
            dice.highlight = new cc.Sprite(res.DiceHightlight_png);
            dice.highlight.attr({
                x: dice._position.x,
                y: dice._position.y
            });

            dice.initialSelection = true;

            layer.addChild(dice.highlight, 10);
        };

        // Roll this die if eligible
        dice.rollDice = function(){
            if (!dice.highlight) {
                diceRoll();
            }
            else if (GameManager.game.canDeselect == false){
                dice.initialSelection = false;
                dice.selectionLocked = true;
            }
        };

        return dice;
    }
};