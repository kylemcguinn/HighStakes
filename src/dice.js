var Dice = {
    getDice: function() {
        cc.spriteFrameCache.addSpriteFrames(res.Dice_plist);
        var dice = new cc.Sprite("#dice1.png");

        var diceRoll = function(){
            var diceRoll = Math.floor((Math.random() * 6) + 1);
            var repeat = Math.floor((Math.random() * 5) + 3);

            var animFrames = [];
            for (var i = 1; i < 7; i++) {
                var str = "dice" + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                animFrames.push(frame);
            }

            var animation = new cc.Animation(animFrames, 0.2);
            var action1 = new cc.Repeat(new cc.Animate(animation), repeat);

            animFrames = [];
            for (i = 1; i < diceRoll; i++) {
                str = "dice" + i + ".png";
                frame = cc.spriteFrameCache.getSpriteFrame(str);
                animFrames.push(frame);
            }

            animation = new cc.Animation(animFrames, 0.2);
            var action2 = new cc.Repeat(new cc.Animate(animation), 1);

            dice.runAction(cc.sequence(action1, action2));
        };

        SpriteUtility.setTouchListener(dice, diceRoll);

        var rollDiceListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "game_roll_dice",
            callback: function(event){
                diceRoll();
            }
        });
        cc.eventManager.addListener(rollDiceListener, 1);

        return dice;
    }
};