var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    Dice_jpg : "res/images/dice.jpg",
    Dice_png : "res/images/dice.png",
    DiceGreen_png : "res/images/diceGreen.png",
    Dice_plist: "res/images/dice.plist",
    Dice_background: "res/images/newvegasdice.jpeg",
    PlusButton_png: "res/images/add.png",
    Minus_png: "res/images/minus.png",
    RollDice_png: "res/images/roll_die.png",
    NewGame_png: "res/images/new_game.png",
    DiceHightlight_png: "res/images/DiceHighlight.png"
};

var g_resources = [];
for (var i in res) {
    if (res.hasOwnProperty(i)) {
        g_resources.push(res[i]);
    }
}