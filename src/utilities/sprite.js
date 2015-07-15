/**
 * Created by Kyle on 7/14/2015.
 */

var SpriteUtility = {
    setTouchListener: function (sprite, onTouchBegan){
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan event callback function
            onTouchBegan: function (touch) {
                var location = touch.getLocation();
                var minX = sprite._position.x - sprite._contentSize.width * sprite._scaleX / 2;
                var maxX = sprite._position.x + sprite._contentSize.width * sprite._scaleX / 2;
                var minY = sprite._position.y - sprite._contentSize.height * sprite._scaleY / 2;
                var maxY = sprite._position.y + sprite._contentSize.height * sprite._scaleY / 2;

                if (location.x >= minX && location.x <= maxX
                    && location.y >= minY && location.y <= maxY) {

                    onTouchBegan();

                    return true;
                }
                return false;
            },
            //Trigger when moving touch
            onTouchMoved: function () {
                return false;
            },
            //Process the touch end event
            onTouchEnded: function () {

            }
        });

        cc.eventManager.addListener(listener1, sprite);
    }
};