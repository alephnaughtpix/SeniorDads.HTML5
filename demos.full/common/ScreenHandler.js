/**
 * @fileOverview Senior Dads Screen handler utilities.
 * @author The Senior Dads
 * @version 0.4
 */

/**
 * @namespace SeniorDads.ScreenHandler
 */
SeniorDads.CreateNameSpace("SeniorDads.ScreenHandler");

/**
 * <h1>SeniorDads.ScreenHandler</h1>
 * <p><strong>{@class}</strong></p>
 * <p><em>var myScreenHandler = new SeniorDads.ScreenHandler(element, name, width, height);</em></p>
 * <p>This is a screen handler which handles the creation and usage of canvas screens.</p>
 * <p>From here, individual screens can be added via {@link SeniorDads.ScreenHandler.Screen}.</p>
 * @class Senior Dads screen handler
 * @param {DOM Object} element HTML DOM element to place the screens in.
 * @param {string} name Unique name ID for the screen handler.
 * @param {number} width Width of the screen.
 * @param {number} height Height of the screen.
 * @param {string} [bgColour] Background colour of screen handler.
 */
SeniorDads.ScreenHandler = function (element, name, width, height, bgColour) {
	if (bgColour===undefined) bgColour = '#000000';					// Default background colour is black
    var screenWrapper = document.getElementById(name);
    if (screenWrapper!=null) 
    	screenWrapper.parentNode.removeChild(screenWrapper);
    screenWrapper = element.appendChild(document.createElement('div'));
    var orderPointer = 1;
    var screenList = new Object;
    var imageData;
    var waitVblAnim;
    screenWrapper.id = name;
    screenWrapper.style.width = width + "px";
    screenWrapper.style.height = height + "px";
    screenWrapper.style.backgroundColor = bgColour;
    screenWrapper.style.position = "relative";

    /**
     * Add a {@link SeniorDads.ScreenHandler.Screen} to screen handler
     * @function
     * @param {string} name Unique name ID for the screen.
     * @param {number} scale Scale of screen.
     * @param {SeniorDads.Image} image {@link SeniorDads.Image}
     */
    this.add = add;

    /**
     * Wait for a number of frames (This will need updating, as it's not very accurate!)
     * @function
     * @param {number} noOfVBLs Number of frames.
     * @param {function} callback Function call at end of wait
     */
    this.WaitVbl = waitVbl;
    /**
     * Stop frame wait
     * @function
     */
    this.FlushWaitVbl = flushWaitVbl;
    /**
     * Set screen handler to go fullscreen.
     * @function
     */
    this.fullscreen = goFullScreen;

    function add(myName, scale, image) {
        screenList[name] = new SeniorDads.ScreenHandler.Screen(screenWrapper, myName, width, height, scale, orderPointer++, image);
        return screenList[name];
    }

    function waitVbl(noOfVBLs, callback) {
        waitVblAnim = setTimeout(function () {
        	window.requestAnimFrame(callback);
        }, noOfVBLs * 20);
    }

    function flushWaitVbl() {
        clearTimeout(waitVblAnim);
    }
        
    function goFullScreen() {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullScreen) {
			element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
		}
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
            if (image.loaded) {
                drawImage();
            } else {
                image.loadedCallback = drawImage;
            }
        else
            loaded = true;

//        this.loaded = function () { return loaded; };
//        this.resource_size = function () { return 1; };					// Size of the resource
//        this.resource_loaded =  function () { return 0; }; 				// The amount already loaded (we get this from the instance of the class we're wrapping.)
//        this.canvas = function () { return canvas; };
        //this.context = function () { return context; };
//        this.name = function () { return name; };
//        this.zIndex = function () { return zIndex; };
//        this.width = function () { return width; };
        //this.height = function () { return height; };
//        this.scale = function () { return scale; };
        Object.defineProperties(this, {
           	loaded:           { get: function() { return loaded; } },							 // Whether the screen has loaded.
           	resource_size:    { get: function() { return 1; } },								 // Size of the resource.
           	resource_loaded:  { get: function() { return (loaded) ? 1 : 0; } },					 // The amount already loaded.
        	canvas: {
            	get: function() { return canvas; }
            },
        	name: {
            	get: function() { return name; }
            },
        	zIndex: {
            	get: function() { return zIndex; }
            },
        	height: {
            	get: function() { return height; }
            },
        	width: {
            	get: function() { return width; }
            },
        	scale: {
            	get: function() { return height; }
            },
        	context: {
            	get: function() { return context; }
            }
        } );

        this.Show = show;
        this.Hide = hide;
        this.Clear = clear;

        function drawImage() {
            if (!(image == null)) {
                imageData = image.imageData;
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
    
    SeniorDads.ScreenHandler.show = function( canvas ) {
        canvas.style.visibility = 'visible';
    };

    SeniorDads.ScreenHandler.hide = function( canvas ) {
        canvas.style.visibility = 'hidden';
    };
    
    SeniorDads.ScreenHandler.Codef = function( width, height, name, zIndex, x, y )  {
    	var codefCanvas;
    	if (x === undefined) x = 0;
    	if (y === undefined) y = 0;
        if (name === undefined) 
        	codefCanvas = new canvas(width,height);
        else {
        	codefCanvas = new canvas(width,height,name);
	        codefCanvas.canvas.style.position = "absolute";
	        codefCanvas.canvas.style.left = x + "px";
	        codefCanvas.canvas.style.top = y +"px";
	        if (!(zIndex === undefined))
	        	codefCanvas.canvas.style.zIndex = zIndex;

        }
        codefCanvas.canvas.style.visiblity = 'hidden';
        Object.defineProperties(codefCanvas, {
            show: {
                value: function () {
                	SeniorDads.ScreenHandler.show(this.canvas);
                }
            },
            hide: {
                value: function () {
                	SeniorDads.ScreenHandler.hide(this.canvas);
                }
            },
            x: {
            	set: function(x) {
            		this.canvas.style.left = x + "px";
            	},
	        	get: function() {
	        		return this.canvas.style.left;
	        	}
            },
            y: {
            	set: function(y) {
            		this.canvas.style.top = y + "px";
            	},
	        	get: function() {
	        		return this.canvas.style.top;
	        	}
            },
            height: {
            	get: function() {
            		return this.canvas.height;
            	}
            },
            width: {
            	get: function() {
            		return this.canvas.width;
            	}
            },
            context: {
            	get: function() {
            		return this.contex;
            	}
            } 
            
        } );
        return codefCanvas;
    };
    
    SeniorDads.ScreenHandler.RGB = function() {
    	this.black = '#000000';
    	this.white = '#ffffff';
    	this.red = '#ff0000';
    	this.green = '#00ff00';
    	this.blue = '#0000ff';
    	this.yellow = '#ff00ff';
    	this.cyan = '#00ffff';
    	this.magenta = '#ff00ff';
    };
};
