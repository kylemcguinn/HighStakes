var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    Dice_jpg : "res/images/dice.jpg",
    Dice_png : "res/images/dice.png",
    Dice_plist: "res/images/dice.plist",
    Dice_background: "res/images/newvegasdice.jpeg",
    PlusButton_png: "res/images/add.png",
    Minus_png: "res/images/minus.png"
};

var g_resources = [];
for (var i in res) {
    if (res.hasOwnProperty(i)) {
        g_resources.push(res[i]);
    }
}