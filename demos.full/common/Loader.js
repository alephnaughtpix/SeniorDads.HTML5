SeniorDads.CreateNameSpace("SeniorDads.Loader");

SeniorDads.Loader = function(resources, loadedCallback, checkInterval) {
    if (loadedCallback === undefined) loadedCallback = null;
    if (checkInterval === undefined) checkInterval = 500;
    var loaderCheckInterval;

    var toLoad = resources.length;
    var loaded = 0;
    var completed = false;

    this.toLoad = function() { return toLoad; };
    this.loaded = function() { return loaded; };
    this.completed = function() { return completed; };

    this.CheckProgress = checkProgress;

    if (loadedCallback != null)
        loaderCheckInterval = setInterval(checkLoader, checkInterval);

    function checkLoader() {
        checkProgress();
        if (completed) {
            clearInterval(loaderCheckInterval);
            if (loadedCallback != null)
                loadedCallback();
        }
    }

    function checkProgress() {
        var length = resources.length;
        toLoad = resources.length;
        loaded = 0;
        for (var i = 0; i < length; i++)
            if (resources[i].loaded()) {
                loaded++;
                toLoad--;
                if (toLoad == 0)
                    completed = true;
            }
    }
};

SeniorDads.Loader.LoadBinary = function (url, buffer, loadedCallBack) {
    //if (loadedCallBack === undefined) loadedCallBack = null;
    var loaded = false;
    this.loaded = function () { return loaded; };
    
    var binaryLoader = new XMLHttpRequest();
    binaryLoader.open("GET", url, true);
    binaryLoader.overrideMimeType('text/plain; charset=x-user-defined');
    binaryLoader.responseType = "arraybuffer";
    binaryLoader.onload = function (myEvent) {
        buffer = binaryLoader.response;
        loaded = true;
        if (loadedCallBack != null)
            loadedCallBack(buffer);
    };
    binaryLoader.send();
};
