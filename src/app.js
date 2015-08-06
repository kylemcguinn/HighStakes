
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    spriteSheet:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        // ask the window size
        var size = cc.winSize;

        GameManager.game = ThreesDice;

        var dice_x = 450;
        var diceSpace = 75;

        var dice = [];

        var addDice = new cc.MenuItemImage(
            res.PlusButton_png,
            res.PlusButton_png,
            function () {
                if (dice.length < 5) {
                    dice_x += diceSpace;
                    this.addDice(dice_x, 400);
                }
            }, this);
        addDice.attr({
            x: size.width - 40,
            y: 40,
            scale:.5,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var removeDice = new cc.MenuItemImage(
            res.Minus_png,
            res.Minus_png,
            function () {
                var die = dice.pop();
                if(die) {
                    this.spriteSheet.removeChild(die);
                    dice_x -= diceSpace;
                }
            }, this);
        removeDice .attr({
            x: size.width - 150,
            y: 40,
            scale:.5,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(addDice,removeDice);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);


        // add dice background"
        this.sprite = new cc.Sprite(res.Dice_background);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5
        });
        this.addChild(this.sprite, 0);

        // add sprite sheet for rendering the dice sprites
        this.spriteSheet = new cc.SpriteBatchNode(res.Dice_png);
        this.spriteSheet.attr({

        });
        this.addChild(this.spriteSheet, 0);

        this.addDice = function(x, y) {
            var newDie = Dice.getDice(this);
            newDie.attr({x: x, y: y});
            dice.push(newDie);
            this.spriteSheet.addChild(newDie);
        };

        for(var i = 0; i < GameManager.game.diceNum; ++i) {
            this.addDice(dice_x, 400);
            dice_x += diceSpace;
        }

        var rollDiceSprite = new cc.Sprite(res.RollDice_png);
        rollDiceSprite.attr({
            x: 200,
            y: 100,
            scale:.5
        });

        SpriteUtility.setTouchListener(rollDiceSprite, function(){
            var selectedCount = 0;
            var diceCount = 0;
            ArrayUtility.forEach(dice, function(value){
                if (value.initialSelection){
                    selectedCount++;
                }
                if (value.diceValue){
                    diceCount++;
                }
            });

            if (diceCount > 0 && GameManager.game.selectionMin && selectedCount < GameManager.game.selectionMin){
                return;
            }

            var event = new cc.EventCustom("game_roll_dice");
            cc.eventManager.dispatchEvent(event);
        });

        var rollCompletedListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "roll_completed",
            callback: function(){
                var diceValues = [];
                ArrayUtility.forEach(dice, function(value){
                    if (typeof value.diceValue !== undefined) {
                        diceValues.push(value.diceValue);
                    }
                });
                var score = GameManager.game.calculateScore(diceValues);

                scoreLabel.string = "Score: " + score;
            }
        });
        cc.eventManager.addListener(rollCompletedListener, 1);

        this.addChild(rollDiceSprite, 5);

        var scoreLabel = new cc.LabelTTF("Score: 0", "Verdana", 18);
        scoreLabel.attr({
            x: 200,
            y: 160
        });

        this.addChild(scoreLabel, 5);

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

