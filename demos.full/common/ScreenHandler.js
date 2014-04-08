/* SENIOR DADS SCREEN HANDLER*/
SeniorDads.CreateNameSpace("SeniorDads.ScreenHandler");

SeniorDads.ScreenHandler = function (element, name, width, height) {
    var screenWrapper = element.appendChild(document.createElement('div'));
    var orderPointer = 1;
    var screenList = new Object;
    var imageData;
    var waitVblAnim;
    screenWrapper.id = name;
    screenWrapper.style.width = width + "px";
    screenWrapper.style.height = height + "px";
    screenWrapper.style.position = "relative";

    this.add = add;
    this.WaitVbl = waitVbl;
    this.FlushWaitVbl = flushWaitVbl;

    function add(myName, scale, image) {
        screenList[name] = new SeniorDads.ScreenHandler.Screen(screenWrapper, myName, width, height, scale, orderPointer++, image);
        return screenList[name];
    }

    function waitVbl(noOfVBLs, callback) {
        waitVblAnim = setTimeout(function () {
            callback();
        }, noOfVBLs * 20);
    }

    function flushWaitVbl() {
        clearTimeout(waitVblAnim);
    }

    SeniorDads.ScreenHandler.Screen = function (element, name, width, height, scale, zIndex, image) {
        if (image === undefined) image = null;
        var loaded = false;
        var backgroundColour;
        var canvas = element.appendChild(document.createElement('canvas'));
        canvas.id = name;
        var scaledWidth = width * scale;
        var scaledHeight = height * scale;
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        canvas.style.position = "absolute";
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.style.zIndex = zIndex;
        var context = canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, 0, 0); // Reset scaling
        context.scale(scale, scale);            // Set scaling 
        context.imageSmoothingEnabled = false;  // Switch off interpolation
        hide();

        if (image != null)
            if (image.loaded()) {
                drawImage();
            } else {
                image.loadedCallback = drawImage;
            }
        else
            loaded = true;

        this.loaded = function () { return loaded; };
        this.canvas = function () { return canvas; };
        this.context = function () { return context; };
        this.name = function () { return name; };
        this.zIndex = function () { return zIndex; };
        this.width = function () { return width; };
        this.height = function () { return height; };
        this.scale = function () { return scale; };

        this.Show = show;
        this.Hide = hide;
        this.Clear = clear;

        function drawImage() {
            if (!(image == null)) {
                imageData = image.imageData();
                context.drawImage(imageData, 0, 0);
                loaded = true;
            }
        }

        function clear(myColour) {
            if (myColour === undefined)
                myColour = backgroundColour;
            else
                backgroundColour = myColour;
            if (myColour != null) {
                context.fillStyle = myColour;
                context.fillRect(0, 0, width, height);
            }
        }

        function show() {
            canvas.style.visibility = 'visible';
        }

        function hide() {
            canvas.style.visibility = 'hidden';
        }
    };
};

