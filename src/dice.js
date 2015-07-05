var Dice = {
    getDice: function() {
        cc.spriteFrameCache.addSpriteFrames(res.Dice_plist);
        var dice = new cc.Sprite("#dice1.png");

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan event callback function
            onTouchBegan: function (touch, event) {

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

                return false;
            },
            //Trigger when moving touch
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();

                return false;
            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
            }
        });

        cc.eventManager.addListener(listener1, dice);

        return dice;
    }
};