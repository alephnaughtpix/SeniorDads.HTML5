/* SENIOR DADS IMAGE LOADER*/
SeniorDads.CreateNameSpace("SeniorDads.Image");

SeniorDads.Image = function(url, loadedCallback) {
    if (loadedCallback === undefined) loadedCallback = null;
    var type = 0;
    var element = null;
    var loaded = false;
    if (isBrowserImage(url)) {
        element = new Image();
        element.src = url;
        element.onload = function() {
            loaded = true;
            if (loadedCallback != null) {
                loadedCallback();
            }
        };
        type = 1;
    }
    this.element = function() { return element; };
    this.type = function () { return type; };
    this.imageData = function () { return element; };
    this.loaded = function () { return loaded; };
    Object.defineProperty(this, "loadedCallback",
        {
            get: function() { return loadedCallback; },
            set: function(val) {
                if (loaded)
                    loadedCallback();
                loadedCallback = val;
            }
        });

    function isBrowserImage(imageUrl) {
        return (imageUrl.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    function isDegasImage(imageUrl) {
        return (imageUrl.match(/\.(pc?|pi?)$/) != null);
    }
};