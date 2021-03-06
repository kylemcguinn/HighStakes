
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
                diceSet: "dice",
                score: 0
            },
            {
                dice: [],
                diceSet:"diceGreen",
                score: 0
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
                this.initializePlayers();
                self.updateScore();
            }, this);
        newGame.attr({
            x: size.width - 125,
            y: 100,
            scale:.5
        });

        var endTurn = new cc.MenuItemImage(
            res.EndTurn_png,
            res.EndTurn_png,
            function () {
                GameManager.nextTurn(GameManager.players[1]);
            }, this);
        endTurn.attr({
            x: size.width - 350,
            y: 100,
            scale:.5
        });

        var menu = new cc.Menu(newGame, endTurn);
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
        this.initializeScores = function(){
            self.scores = [];

            ArrayUtility.forEach(GameManager.players, function(player, index) {

                var scoreLabel = new cc.LabelTTF("Score: 0", "Verdana", 18);
                scoreLabel.attr({
                    x: 350,
                    y: 400 - index * 100
                });

                self.addChild(scoreLabel, 5);

                self.scores.push(scoreLabel);
            });
        };
        this.initializePlayers = function(){
            ArrayUtility.forEach(GameManager.players, function(player, index) {
                player.score = 0;
            });
        };

        this.updateScore = function(score){
            ArrayUtility.forEach(GameManager.players, function(player, index) {
                self.scores[index].string = "Score: " + player.score;
            });
        };

        this.destroyDice = function(){
            ArrayUtility.forEach(GameManager.players, function(player) {
                ArrayUtility.forEach(player.dice, function (value) {
                    self.removeChild(value.highlight);
                });
            });
        };

        this.initializeDice();
        this.initializeScores();

        var rollDiceSprite = new cc.Sprite(res.RollDice_png);
        rollDiceSprite.attr({
            x: 200,
            y: 100,
            scale:.5
        });

        SpriteUtility.setTouchListener(rollDiceSprite, function(){
            GameManager.rollDice(GameManager.players[0]);
        });

        this.addChild(rollDiceSprite, 5);

        var gameLabel = new cc.LabelTTF(GameManager.game.name, "Verdana", 28);
        gameLabel.attr({
            x: 150,
            y: 350
        });

        this.addChild(gameLabel, 5);

        var updateScoreListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "update_score",
            callback: function(){
                self.updateScore();
            }
        });
        cc.eventManager.addListener(updateScoreListener, 1);

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

