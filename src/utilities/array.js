var ArrayUtility = {
    forEach: function(array, callback) {
        for (var index = 0; index < array.length; ++index) {
            callback(array[index], index);
        }
    }
};