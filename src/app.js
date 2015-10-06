
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    spriteSheet:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        // ask the window size
        var size = cc.winSize;
        var self = this;

        // add dice resources
        cc.spriteFrameCache.addSpriteFrames(res.Dice_plist);

        GameManager.game = ThreesDice;
        GameManager.players = [
            {
                dice: [],
                diceSet: {
                    name: "dice"
                }
            },
            {
                dice: [],
                diceSet: {
                    name: "diceGreen"
                }
            }
        ];

        var dice_x = 450;
        var diceSpace = 75;

        var newGame = new cc.MenuItemImage(
            res.NewGame_png,
            res.NewGame_png,
            function () {
                this.destroyDice();
                this.initializeDice();
            }, this);
        newGame.attr({
            x: size.width - 200,
            y: 100,
            scale:.5
        });

        var menu = new cc.Menu(newGame);
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

        this.addPlayerDice = function(x, y, player) {
            var newDie = Dice.getDice(this, player.diceSet);
            newDie.attr({x: x, y: y});
            player.dice.push(newDie);
            this.spriteSheet.addChild(newDie);
        };

        this.initializeDice = function(){
            for(var j = 0; j < GameManager.players.length; j++) {
                GameManager.players[j].dice = [];
                dice_x = 450;
                for (var i = 0; i < GameManager.game.diceNum; ++i) {
                    this.addPlayerDice(dice_x, 400 - j * 100, GameManager.players[j]);
                    dice_x += diceSpace;
                }
            }
        };
        this.setScore = function(score){
            scoreLabel.string = "Score: " + score;
        };

        this.destroyDice = function(){
            ArrayUtility.forEach(GameManager.players[0].dice, function(value){
                self.removeChild(value.highlight);
            });
            this.setScore(0);
        };

        this.initializeDice();

        var rollDiceSprite = new cc.Sprite(res.RollDice_png);
        rollDiceSprite.attr({
            x: 200,
            y: 100,
            scale:.5
        });

        SpriteUtility.setTouchListener(rollDiceSprite, function(){
            GameManager.rollDice(GameManager.players[0]);
        });

        var rollCompletedListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "roll_completed",
            callback: function(){
                var diceValues = [];
                ArrayUtility.forEach(GameManager.players[0].dice, function(value){
                    if (typeof value.diceValue !== undefined) {
                        diceValues.push(value.diceValue);
                    }
                });
                var score = GameManager.game.calculateScore(diceValues);

                self.setScore(score);
            }
        });
        cc.eventManager.addListener(rollCompletedListener, 1);

        this.addChild(rollDiceSprite, 5);

        var scoreLabel = new cc.LabelTTF("Score: 0", "Verdana", 18);
        scoreLabel.attr({
            x: 200,
            y: 160
        });

        var gameLabel = new cc.LabelTTF(GameManager.game.name, "Verdana", 28);
        gameLabel.attr({
            x: 200,
            y: 400
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

