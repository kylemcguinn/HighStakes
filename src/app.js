
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    dice:null,
    spriteSheet:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );

        /*var batch = cc.SpriteBatchNode.create(res.Dice_jpg, 36);
        var sprite = cc.Sprite.createWithTexture(batch.getTexture(), cc.rect(0, 0, 63, 63));
        batch.addChild(sprite);

        batch.attr({
            x: 400,
            y: 200
        });
        this.addChild(batch, 2);*/

        var num = 4;

        cc.spriteFrameCache.addSpriteFrames(res.Dice_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.Dice_png);
        this.addChild(this.spriteSheet);

        var animFrames = [];
        for (var i = 1; i < 7; i++) {
            var str = "dice" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames,0.2);
        var action1 = new cc.Repeat(new cc.Animate(animation), 1);

        animFrames = [];
        for (i = 1; i < num; i++) {
            str = "dice" + i + ".png";
            frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        animation = new cc.Animation(animFrames,0.2);
        var action2 = new cc.Repeat(new cc.Animate(animation), 1);

        this.dice = new cc.Sprite("#dice1.png");
        this.dice.attr({x:400, y:200});

        this.dice.runAction(cc.sequence(action1, action2));

        this.spriteSheet.addChild(this.dice);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

