var Dice = {
    getDice: function() {
        var num = 7;

        cc.spriteFrameCache.addSpriteFrames(res.Dice_plist);

        var animFrames = [];
        for (var i = 1; i < 7; i++) {
            var str = "dice" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.2);
        var action1 = new cc.Repeat(new cc.Animate(animation), 1);

        animFrames = [];
        for (i = 1; i < num; i++) {
            str = "dice" + i + ".png";
            frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        animation = new cc.Animation(animFrames, 0.2);
        var action2 = new cc.Repeat(new cc.Animate(animation), 1);

        this.dice = new cc.Sprite("#dice1.png");
        this.dice.runAction(cc.sequence(action1, action2));

        return this.dice;
    }
};