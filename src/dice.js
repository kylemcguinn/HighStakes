var Dice = {
    getDice: function(layer) {
        cc.spriteFrameCache.addSpriteFrames(res.Dice_plist);
        var dice = new cc.Sprite("#dice1.png");

        var diceRoll = function(){

            var numberOfActions = dice.getNumberOfRunningActions();

            if (numberOfActions > 0)
                return;

            var diceRoll = Math.floor((Math.random() * 6) + 1);
            //var repeat = Math.floor((Math.random() * 5) + 3);
            var repeat = 1;

            dice.diceValue = diceRoll == 1 ? 6 : diceRoll - 1;

            var animFrames = [];
            for (var i = 1; i < 7; i++) {
                var str = "diceGreen" + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                animFrames.push(frame);
            }

            var animation = new cc.Animation(animFrames, 0.2);
            var action1 = new cc.Repeat(new cc.Animate(animation), repeat);

            animFrames = [];
            for (i = 1; i < diceRoll; i++) {
                str = "diceGreen" + i + ".png";
                frame = cc.spriteFrameCache.getSpriteFrame(str);
                animFrames.push(frame);
            }

            animation = new cc.Animation(animFrames, 0.2);
            var action2 = new cc.Repeat(new cc.Animate(animation), 1);

            dice.runAction(cc.sequence(action1, action2));

            var event = new cc.EventCustom("roll_completed");
            cc.eventManager.dispatchEvent(event);
        };

        SpriteUtility.setTouchListener(dice, function(){
            if (!dice.highlight && dice.diceValue) {
                dice.highlight = new cc.Sprite(res.DiceHightlight_png);
                dice.highlight.attr({
                    x: dice._position.x,
                    y: dice._position.y
                });

                dice.initialSelection = true;

                layer.addChild(dice.highlight, 10);
            }
            else if (!dice.selectionLocked){
                layer.removeChild(dice.highlight);
                dice.highlight = null;
                dice.initialSelection = false;
            }
        });

        var rollDiceListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "game_roll_dice",
            callback: function(){
                if (!dice.highlight) {
                    diceRoll();
                }
                else if (GameManager.game.canDeselect == false){
                    dice.initialSelection = false;
                    dice.selectionLocked = true;
                }
            }
        });
        cc.eventManager.addListener(rollDiceListener, 1);

        return dice;
    }
};