/**
 * @fileOverview Senior Dads demo framework.
 * @author The Senior Dads
 * @version 0.4
 */

/**
 * Cross browser hack for requestAnimFrame 
 * @private
 */
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 60);
		};
})();

var DEMO_ROOT = "/js/SeniorDads.HTML5/demos";

/*
 * NAMESPACE HELPER ROUTINES ==========================================
 * 
 */

// Create the root namespace and making sure we're not overwriting it

/**
  * <h1>SENIOR DADS HTML5 DEMO ROUTINES!</h1>
  * <p>A series of helper classes and/or hacks used by The Senior Dads for their HTML5 demos.</p>
  * @namespace SeniorDads
  */
var SeniorDads = SeniorDads || {};
 
// create a general purpose namespace method
// this will allow us to create namespace a bit easier
SeniorDads.CreateNameSpace = function (namespace) {
    var nsparts = namespace.split(".");
    var parent = SeniorDads;
 
    // we want to be able to include or exclude the root namespace 
    // So we strip it if it's in the namespace
    if (nsparts[0] === "SeniorDads") {
        nsparts = nsparts.slice(1);
    }
 
    // loop through the parts and create 
    // a nested namespace if necessary
    for (var i = 0; i < nsparts.length; i++) {
        var partname = nsparts[i];
        // check if the current parent already has 
        // the namespace declared, if not create it
        if (typeof parent[partname] === "undefined") {
            parent[partname] = {};
        }
        // get a reference to the deepest element 
        // in the hierarchy so far
        parent = parent[partname];
    }
    // the parent is now completely constructed 
    // with empty namespaces and can be used.
    return parent;
};

/*
 * END OF NAMESPACE HELPER ROUTINES ==========================================
 * 
 */


/**
 * <h1>Wobbler</h1>
 * <p><strong>Create a "wobble" effect.</strong></p>
 * <p><em>var myWobbler = new SeniorDads.Wobbler(hWobbleParameters, vWobbleParameters, zWobbleParameters);</em></p>
 * @constructor
 * @class Create a "wobble" effect.
 * @param {Object[]} hWobbleParameters Horizontal wobble parameters.
 * @param {Object[]} [vWobbleParameters] vertical wobble parameters.
 * @param {Object[]} [zWobbleParameters] Z-index wobble parameters.
 * @property {number} h Get next horizontal wobble differential.
 * @property {number} v Get next vertical wobble differential.
 * @property {number} z Get next Z-index wobble differential.
 * @example
 *  //Place an image in the center of a 640x400 area and wobble it.
 *  
 *  // First create the area and load the image
 *  var myPlaceholder = document.getElementById('placeholder'); // <- Assuming we have a div with ID of 'placeholder' on the web page.
 *  myPlaceholder.style.width = "640px";
 *  myPlaceholder.style.height = "400px";
 *  myPlaceholder.style.position = "relative";
 *  var myImage = new Image();
 * 	myImage = "myImage_url.png";
 * 	myImage.style.position = "absolute";
 *  myPlaceholder.appendChild(myImage);
 *  
 *  var myWobbler;
 *  
 *  // When the image is loaded, create the wobbler
 *  myImage.onload = function() {
 *  
 *  	myWobbler = new SeniorDads.Wobbler(
 *  		[ 
 *  			{value: 0, amp: 3, inc: 0.30},
 *  			{value: 0.5, amp: 3, inc: 0.40}
 *  		],
 *  		[
 *  			{value: 0.5, amp: 3, inc: 0.20},
 *  			{value: 0, amp: 2, inc: 0.10}
 *  		]);
 *  	// Start the animation loop.
 *  	animationLoop();
 *  }
 *  
 *  // Animation loop- wobbles the image relative to the centre of the area.
 *  function animationLoop() {
 *  	var x = 320 + myWobbler.h();
 *  	var y = 200 + myWobbler.v();
 *  	myImage.style.left = x + "px";
 *  	myImage.style.top = y + "px";
 *  	requestAnimFrame( animationLoop );
 *  }
 */
SeniorDads.Wobbler = function (hWobbleParameters, vWobbleParameters, zWobbleParameters) {
	if (hWobbleParameters === undefined) hWobbleParameters = null;
	if (vWobbleParameters === undefined) vWobbleParameters = null;	// Default for optional parameter
	if (zWobbleParameters === undefined) zWobbleParameters = null;	// Default for optional parameter
	
	// Set properties
	this.h = function() { return wobble(hWobbleParameters); };		// get next horizontal wobble differential
	// Get next vertical wobble differential
	if ( ( hWobbleParameters != null) && (vWobbleParameters == null) )
		this.v = this.h;											// If only "horizontal" wobble supplied, vertical differential = horizontal
	else
	// Get next z-index wobble differential
	this.v = function() { return wobble(vWobbleParameters); };
	if ( ( hWobbleParameters != null) && (zWobbleParameters == null) )
		this.z = this.h;											// If only "horizontal" wobble supplied, z-index differential = horizontal
	else
		this.z = function() { return wobble(zWobbleParameters); };
		
	/* Main wobbling calculator.
	 * 
	 * This combines the sines waves and their positions as defined in the 
	 * wobble parameters to arrive at a combined wobble value.
	 * 
	 */
	function wobble(wobbleParameters) {
		var wobbleVal = null;			// Default value for invalid wobble.
		if (wobbleParameters != null)	// only calculate if we have wobble parameters.
			wobbleVal = 0;				// Reset wobble value.
			for( var i = 0; i < wobbleParameters.length; i++) { 							// For each wobble param...
				wobbleVal += Math.sin(wobbleParameters[i].value) * wobbleParameters[i].amp; // Add current sine wave position of wobble element
				wobbleParameters[i].value += wobbleParameters[i].inc;						// Move onto next sine wave position.
			}
		// Combined wobble value has now been calculated.
		return wobbleVal; 
	}
	
};

/**
 * <h1>Bomb</h1>
 * <p><strong>Display the Atari TOS "bomb" pattern for exceptions in Atari 16/24bit machines.</strong></p>
 * <p><em>var myBomb = new SeniorDads.Bomb();</em></p>
 * @class Display the Atari TOS "bomb" pattern.
 * @constructor
 * @example
 *  // First create the canvas to bomb.
 *  var myPlaceholder = document.getElementById('placeholder'); // <- Assuming we have a div with ID of 'placeholder' on the web page.
 *  var myCanvas = myPlaceholder.appendChild(document.createElement('canvas'));
 *  
 *  // Now bomb it!
 *  var myBomb = new SeniorDads.Bomb();
 *  myBomb.bombCanvas(myCanvas, 4);
 */
SeniorDads.Bomb = function () {
    // Atari TOS bomb bitmap pattern- copied from old demo source code, itself copied from ROM listing in ST Internals!
    var bombBits = new Uint16Array([
        1536,  // %0000011000000000
        10496, // %0010100100000000
        128,   // %0000000010000000
        18496, // %0100100001000000
        4592,  // %0001000111110000
        496,   // %0000000111110000
        2044,  // %0000011111111100
        4094,  // %0000111111111110
        4094,  // %0000111111111110
        8191,  // %0001111111111111
        8175,  // %0001111111101111
        4078,  // %0000111111101110
        4062,  // %0000111111011110
        2044,  // %0000011111111100
        1016,  // %0000001111111000
        224    // %0000000011100000
    ]);
    // Set up a canvas for the canvas friendly version of the bomb image.
    var truColBombCanvas = document.createElement('canvas');
    truColBombCanvas.id = "SeniorDads.Bomb.Store";
    truColBombCanvas.width = 16;					// Bomb is 16x16 pixels.
    truColBombCanvas.height = 16;
    truColBombCanvas.style.visibility = 'hidden';

    convertBombToTruCol();			// Convert the bitmap to the canvas friendly version of the bomb image.

    /**
     * <h3>bombCanvas</h3>
     * 
     * <p><strong>Display bombs.</strong></p>
     * <p>The bombs are drawn in black on white in the middle left of the screen.</p>
     * @function
     * @param {SeniorDads.ScreenHandler.Screen} screen Screen to draw to.
     * @param {number} bombCount Number of bombs to draw
     */
    this.bombCanvas = bombCanvas;	// Setup method for creating bombs

    /*
     * Convert bomb bitmap to canvas colours.
     * 
     * For each pixel we set the foreground/background colour accordingly. 
     * ie black on white, as used in the Atari Falcon in trucolor mode.
     *  
     */
    function convertBombToTruCol() {
        var foreground = [0, 0, 0, 0xff];					// Foreground is black.
        var background = [0xff, 0xff, 0xff, 0xff];			// Background is white.
        var context = truColBombCanvas.getContext('2d');
        var canvasData = context.createImageData(16, 16);	// Create the 16x16 image data.
        var colour;
        var canvasDataPosition = 0;							// Start at the top left of the image data.
        for (var i = 0; i < 16; i++) {						// There's 16 words in the bomb,
            var currentBombLine = bombBits[i];				// ... each of which equals a single row of the bomb pixels,
            for (var j = (16 - 1); j > -1; --j) {			// ... which is 16 pixels in length
            	// Bit-test current pixel in word to determine if there's a pixel present.
            	// If there is use the foreground colour, otherwise the background colour.
                colour = ((currentBombLine & (1 << j)) > 0) ? foreground : background;
            	// Now plot the pixel in the relevant colour.
                canvasData.data[canvasDataPosition++] = colour[0];
                canvasData.data[canvasDataPosition++] = colour[1];
                canvasData.data[canvasDataPosition++] = colour[2];
                canvasData.data[canvasDataPosition++] = colour[3];
            }
        }
        // Now the bomb is drawn, copy it to the bomb canvas.
        context.putImageData(canvasData, 0, 0);
    }
    
    /*
     * bombCanvas
     * # screen - SeniorDads.ScreenHandler.Screen to draw to.
     * # bombCount - number of bombs to draw
     */
    function bombCanvas( screen, bombCount ) {
    	var y, context;
    	var x = 0;
    	y = (screen.height - 16) / 2;			// Go to middle left of screen
    	context = screen.context;				// Get canvas context of screen
    	for (var i=0; i < bombCount; i++) {				// For the defined number of bombs...
    		context.drawImage(truColBombCanvas, x, y);	// Copy the bomb canvas to screen.
    		x += 16;									// Move to position of next bomb.
    	} 
    };
};

/**
 * <h1>SeniorDads.Demos</h1>
 * <p> The lovely space in which all the Senior Dads HTML5 demos live!</p>
 * @namespace SeniorDads.Demos
 */
SeniorDads.CreateNameSpace("SeniorDads.Demos");

/**
 * <h1>SeniorDads.Demos.Demo</h1>
 * <p><strong>Senior Dads demo framework.</strong></p>
 * <p><em>var myDemo = new SeniorDads.Demos.Demo(preLoader, loader, init, abort);</em></p>
 * <p>This class allows you to add individual screens (See {@link SeniorDads.Demos.Demo.DemoPart}), and to handle
 * general loading of resources, and initialisation before starting the demo. There is also a <i>preloader</i>, which can be
 * used if you need to set something up before loading resources. (eg a "Now loading demo" type screen.)</p>
 * <p>Once the demo is started, the class can handle moving through the list of screens, or stopping the demo altogether.</p>
 * <p>Both the preloader and loaders can be supplied with callback functions to be executed when they're done.<p>
 * @constructor 
 * @class Senior Dads demo framework
 * @param {function} preLoader Function to call <i>before</i> loading resources
 * @param {function} loader Function to call to <i>start</i> loading resources
 * @param {function} init Function to call after loading resources but <i>before</i> running the demo.
 * @param {function} abort Function to call if the demo needs to make a speedy exit.
 * @param {function} [onEnd] Function to call when the demo has fully ended. (ie after abort)
 * @property {bool} started Has the demo started?
 * @property {bool} ended Has the demo ended?
 */
SeniorDads.Demos.Demo = function(preLoader, loader, init, abort, onEnd) {
	if (onEnd === undefined) onEnd = null;
	var currentDemoPart;			// Currently running SeniorDads.Demos.Demo.DemoPart 
	var demoPartList = [];			// Array of SeniorDads.Demos.Demo.DemoPart containing the demo screens.
	var currentDemoPartCounter = 0; // Current position of demo
	var started = false;			// Whether the demo has started.
	var ended = false;				// Whether the demo has ended.
    
	/**
	 * Preload a demo, without initalising or starting.
	 * @function
	 * @param {function} [preLoaderDone] Function to call when preloader is finished.
	 */
    this.preload = preLoad;
    
	/**
	 * Load a demo, without initalising or starting.
	 * @function
	 * @param {function} [loaderDone] Function to call when loader is finished.
	 */
    this.load = load;
	/**
	 * Initialise a demo, without starting.
	 * @function
	 */
    this.init = initialise; 
	/**
	 * Abort a demo.
	 * @function
	 */
    this.abort = abortDemo;
	/**
	 * Add a screen to a demo. This requires creation of a {@link SeniorDads.Demos.Demo.DemoPart}.
	 * @example
	 *  // Example stub for a simple one screen demo.
	 *  
	 *  // Create the demo.
	 *  var myDemo = new SeniorDads.Demos.Demo(preLoader, loader, init, abort);
	 *  // Add a screen to it.
	 *  myDemo.add( new SeniorDads.Demos.Demo.DemoPart( part1init, part1Start, part1abort, demoEnded );
	 *  // Load and start the demo.
	 *  myDemo.loadAndStart();
	 *  
	 *  // [...]
	 *  
	 *  // PRELOADER:
	 *  // This is run first by the demo object, with a callback to the 
	 *  // loader function in the parameter "preLoaderDone".
	 *  function preLoader( preLoaderDone ) {
	 *  	// [... Pre loading code ...]
	 *  	preLoaderDone();	// <- This will call the function "loader" below.
	 *  }
	 *  
	 *  // LOADER:
	 *  // This is run second as a result of the preloader callback. It contains
	 *  // a callback to the initalise and start function in the parameter "loaderDone".
	 *  function loader( loaderDone ) {
	 *  	// [... Loading code ...]
	 *  	loaderDone() 	// <- This will call the initialise and start functions in the object.
	 *  }
	 *  
	 *  // INITIALISE:
	 *  // This is run third by the demo object's initialise and start functions.
	 *  //
	 *  // After this is run, the first demo screen is run (ie function 'part1Start'.)
	 *  function init() {
	 *  	// [... Initalisation code ...]
	 *  }
	 *  
	 *  // ABORT:
	 *  // This is called if "myDemo.abort();" is used.
	 *  function abort() {
	 *  	// [... Demo abort code ...]
	 *  }
	 *  
	 *  // DEMO SCREEN INITIALISE:
	 *  // This is run when the demo screen is first added to the demo. 
	 *  // (ie before the start of the demo, and as a result of the command 
	 *  // "myDemo.add( ... )".)
	 *  function part1init() {
	 *  	// [... Screen initialisation code ...]
	 *  }
	 *  
	 *  // DEMO SCREEN RUN:
	 *  // This is run when the demo object runs the first screen.
	 *  function part1Start() {
	 *  	// [... Screen main code ...]
	 *  }
	 *  
	 *  // DEMO SCREEN ABORT:
	 *  // This is called if "myDemo.abort();" is used.
	 *  function part1abort() {
	 *  	// [... Screen abort code ...]
	 *  }
	 *  
	 *  // DEMO ENDED:
	 *  // Called when the demo has fully finished.
	 *  function demoEnded() {
	 *  	// [... This demo is ended! ...]
	 *  }
	 * @function
	 * @param {SeniorDads.Demos.Demo.DemoPart} currentDemo Demo screen.
	 */
    this.add = addDemoPart;
	/**
	 * Start demo.
	 * @function
	 */
    this.start = start;
	/**
	 * Go to next demo screen.
	 * @function
	 */
    this.next = nextDemoPart;
	/**
	 * Load, initialise and start demo. This will call, in the following order:
	 * <ul>
	 * <li>the preloader,</li>
	 * <li>the loader,</li>
	 * <li>the initialisation,</li>
	 * <li>and finally, the demo, from the first screen onwards.</li>
	 * @function
	 */
    this.loadAndStart = loadAndStart;

    Object.defineProperties(this, {
       	started: { get: function() { return started; } },	// Whether the demo has started
       	ended:   { get: function() { return ended; } }		// Whether the demo has ended
    } );

    
    this.currentPart = function() { 
    	return currentDemoPart; 
    	};

    
    /*
     * Add demo part.
     * 
     * This pushes the demo screen in "currentDemo" onto the array of SeniorDads.Demos.Demo.DemoPart
     */
    function addDemoPart(currentDemo) {
    	demoPartList.push(currentDemo);
    }
    
    /*
     * Add demo parts. (Experimental.)
     * 
     * This accepts an array of SeniorDads.Demos.Demo.DemoPart in "currentDemo" into the demo screen array.
     */
    function addDemoParts(newDemoList) {
    	demoPartList = newDemoList.clone();
    }

    /*
     * Load demo, initialise and start. 
     * 
     * This results in the following being called in order:
     * # preLoader (if it exists)
     * # loader (if it exists)
     * # init (if it exists)
     * # start (if it exists)
     */
    function loadAndStart() { 
    	preLoad( function() { load( initAndStart ); } ); 
    }
    
    /*
     * Run demo preloader, and then run the callback in "preLoaderDone" when finished.
     */
    function preLoad( preLoaderDone ) {
        if (preLoaderDone === undefined) preLoaderDone = null;	// "preLoaderDone" is optional.
    	if (preLoader != null)  		// Only run if we have an preloader function
    		preLoader( preLoaderDone );
    	else  							// If there's no preloader, try running the callback
    		if (preLoaderDone != null)
    			preLoaderDone();
    }
    
    /*
     * Run demo loader, and then run the callback in "loaderDone" when finished.
     */
    function load( loaderDone ) {
        if (loaderDone === undefined) loaderDone = null;	// "loaderDone" is optional.
    	if (loader != null)  			// Only run if we have an loader function
    		loader( loaderDone );
    	else  							// If there's no loader, try running the callback
    		if (loaderDone != null)
    			loaderDone();
    }

    /*
     * Initialise and start demo. 
     * 
     * This results in the following being called in order:
     * # init (if it exists)
     * # start (if it exists)
     */
    function initAndStart() {
    	initialise(); 
		start();
    }

    /*
     * Initialise demo without starting. 
     */
    function initialise() {
    	if ( init != null)		// Only run if we have an initialise function
    		init(); 
    }
    
    /*
     * Start demo.
     * 
     * This resets the demo array position to the start, and pops off the 
     * next demo screen. (ie the first one.)
     */
    function start() {
    	currentDemoPartCounter = 0;			// Start of demo
    	started = true;
    	nextDemoPart();						// Start first demo screen
    }
    
    /*
     * Get next demo screen.
     * 
     * This pops off the next screen in the array. If we're out of screens,
     * it evokes the demo abort.
     */
    function nextDemoPart() {
    	if (currentDemoPartCounter < demoPartList.length ) {			// If We've still got screens,...
	    	currentDemoPart = demoPartList[currentDemoPartCounter++];	// ... get the next screen,...
	    	currentDemoPart.start();									// ... and start it.
    	}
    	else {
    		abortDemo();
    	}
    }
    
    /*
     * Abort demo.
     * 
     * If we're got any screens currently running, abort that as well.
     */
    function abortDemo() {
    	if ( currentDemoPart != null )			// If we're got any screens currently running...
    		currentDemoPart.abort();			// .. abort that as first.
    	if ( abort != null)						// Only run if we have an abort function
    		abort();
    	ended = true;
    	if (onEnd != null)						// Only run if we have an onEnd function
    		onEnd();
    }
    
    /**
    * <h1>SeniorDads.Demos.Demo.DemoPart</h1>
    * <p><strong>Senior Dads demo screen.</strong></p>
    * <p><em>var myDemoPart = new SeniorDads.Demos.Demo.DemoPart(init, start, abort);</em></p>
    * @constructor 
    * @class Senior Dads demo screen.
	* @param {function} init Function to call before starting.
	* @param {function} start Function to call to start screen.
	* @param {function} abort Function to call if the screen needs to make a speedy exit.
    */
    SeniorDads.Demos.Demo.DemoPart = function(init, start, abort) {
    	/**
    	 * Call function before starting.
    	 * @function
    	 */
        this.init = function () { 
        	if ( init != null)				// Only call if we have a function.
        		init(); 
        };
    	/**
    	 * Call function to start screen.
    	 * @function
    	 */
        this.start = function () { 
        	if ( start != null)				// Only call if we have a function.
        		start(); 
        };
    	/**
    	 * Call function if the screen needs to make a speedy exit.
    	 * @function
    	 */
        this.abort = function () { 
        	if ( abort != null)				// Only call if we have a function.
        		abort(); 
        };
        
        this.init();
    };
};

/**
 * <h1>SeniorDads.Demos.Player</h1>
 * <p><strong>"YouTube" style player for Senior Dads demos</strong></p>
 * <p><em>var myPlayer = new SeniorDads.Demos.Player(container, name, demoClass, width, height);</em></p>
 * @constructor 
 * @class Senior Dads demo player
 * @param {DOM object} container HTML element from the web page to put the player in
 * @param {string} name Unique name for the demo element
 * @param {object} demoClass Name of the demo class.
 * @param {int} [width] Width of the player.
 * @param {int} [height] Height of the player.
 * @example
 * 	<html><head><script language="javascript">
 *  // Load the 'Def Demo into the player. (See {@link SeniorDads.Demos.DefDemo})
 *  var player; 
 *  function startPlayer() { 
 *  	player = new SeniorDads.Demos.Player(document.getElementById('demo'), 'democanvas', SeniorDads.Demos.DefDemo);
 *  }
 *  </script></head>
 *  <body onload="startPlayer();"><div id="demo"></div></body>
 *  </html>
 */
SeniorDads.Demos.Player = function(container, name, demoClass, width, height) {
	var button;				// Button element
	var replay = false;		// False as we're initalising
	var buttonOpacity = 1;	// We can fade the button in/out

	// Create new instance of the demo, and start loading
	var demo = new demoClass(container, name, playerEnd);	// Set the replay function up when the demo ends. 
	demo.Load(readyToPlay); 								// When loaded, activate the play button.
	
	if (width === undefined) width = demoClass.width;		// If width, height and name not specified, try getting it from the demo.
	if (height === undefined) height = demoClass.height;
	if (width === undefined) width = 640;					// If not default is 640 x 400;
	if (height === undefined) height = 400;
	
	// Create the styling for the player, and add to the web page.
    var styleSheet = document.getElementsByTagName("head")[0].appendChild(document.createElement('style'));
    styleSheet.innerHTML = 
    	"@keyframes fadeout { 0% { opacity: 1; } 100% { opacity: 0; } } " +
    	"@keyframes fadein { 0%   { opacity: 0; } 100% { opacity: 1; } }" +
    	"#" + container.id +" { width: " + width + "px; min-height: " + height + "px; border: 1px solid #888888; position: relative; box-shadow: 0px 0px 10px 2px #000000; } " +
    	"#" + container.id +" #loadingCover { z-index: 9999; position: absolute; left: " + (width - 200) / 2 + "px; top: " + (height - 200) / 2 + "px; width: 200px; height: 200px; }" +
    	"#" + container.id +" #loading { background-image: url(" + DEMO_ROOT + "/common/resources/demo_loading.png); width:200px; height:200px; }" +
    	"#" + container.id +" #loaded { background-image: url(" + DEMO_ROOT + "/common/resources/demo_play.png); cursor:pointer; width:200px; height:200px; }" +
    	"#" + container.id +" #loaded:hover { background-image: url(" + DEMO_ROOT + "/common/resources/demo_play_hover.png); }" +
    	"#" + container.id +" #replay { background-image: url(" + DEMO_ROOT + "/common/resources/demo_replay.png); cursor:pointer; width:200px; height:200px; }" +
    	"#" + container.id +" #replay:hover { background-image: url(" + DEMO_ROOT + "/common/resources/demo_replay_hover.png); }" +
    	"#" + container.id +" #Fullscreen { color: #ffffff; cursor: pointer; z-index: 9998; position: absolute; right: 0px; top: 0px; -webkit-animation: fadeout 3s forwards; -moz-animation: fadeout 3s forwards; -o-animation: fadeout 3s forwards; animation: fadeout 3s forwards; }" +
    	"#" + container.id +" #Fullscreen:hover { -webkit-animation: fadein 0.5s forwards; -moz-animation: fadein 0.5s forwards; -o-animation: fadein 0.5s forwards; animation: fadein 0.5s forwards; }" +
    	"";

    /* in order: x offset, y offset, blur size, spread size, color */
    /* blur size and spread size are optional (they default to 0) */
    
    // Now add the HTML for the player within the container
    var loadingCover = container.appendChild(document.createElement('div'));	// The wrapper for the player
    loadingCover.id = 'loadingCover';
    var playButton = loadingCover.appendChild(document.createElement('div'));	// The loading/play/replay button
    playButton.id = 'loading';
    
	// The top right fullscreen button.
   	var fullscreenButton = container.appendChild(document.createElement('div'));
   	fullscreenButton.id = 'Fullscreen';
   	fullscreenButton.innerHTML = "[fUlLsCr33N!!1!]";
   	// Set up the button events
   	fullscreenButton.addEventListener('click',  fullscreen );
   	fullscreenButton.addEventListener('touchend',  fullscreen );
   	// Set up events for when the screen goes in/out of fullscreen (ie for toggling the fullscreen button.)
   	document.addEventListener("fullscreenchange", fullScreenToggled);
   	document.addEventListener("webkitfullscreenchange", fullScreenToggled);
   	document.addEventListener("mozfullscreenchange", fullScreenToggled);
   	document.addEventListener("MSFullscreenChange", fullScreenToggled);

   	// When the demo is loaded, activate the play button.
	function readyToPlay() {
    	playButton.id = "loaded";				// This changes the styling of the "loading" button to the "play" button.
    	playButton.addEventListener('mousedown', runDemo);		// Event to play the demo
    	playButton.addEventListener('touchend', runDemo);
    	window.onkeypress = runDemo;							// Can also play the demo by pressing a key
    }

	// When "Play" is selected, this function is run
    function runDemo() { 
    	playButton.style.display = "none";						// Make button disappear!
    	playButton.removeEventListener('mousedown', runDemo);	// De-activate play button events
    	playButton.removeEventListener('touchend', runDemo);
    	if (replay) {											// If we're replaying, get rid of the old instance of the demo, and reload.
        	demo = null;    	
        	demo = new demoClass(container, name, playerEnd); 
        	demo.LoadAndStart(); 
    	}
    	else 
    		demo.Start(); 										// Otherwise, just start the demo.
    }

    // When the fullscreen button is clicked, this is run.
    function fullscreen() {
    	demo.fullscreen();			// Easy, huh!
    }
    
    // When the demo ends, fade on the replay button.
    function playerEnd() {
    	buttonOpacity = 0;						// The startiong opacity of the button (ie completely clear)
    	replay = true;							// Specify that we're in re-play mode.
    	playButton.id = "replay";				// This changes the styling of the "play" button to the "replay" button.
    	playButton.style.display = "block";					// Bring back the button...
    	playButton.style.opacity = buttonOpacity;			// ... But make it invisible.
    	playButton.addEventListener('mousedown', runDemo);	// Bring back the "play" events.
    	playButton.addEventListener('touchend', runDemo);
    	setTimeout(fadeInLoop, 3000);			// Wait a couple of seconds, then start fading the button back in.
    	window.onkeypress = runDemo;			// Can also re-play the demo by pressing a key
    }
    
    // Fade in the re-play button. This works by changing the element's opacity from 0 (clear) 
    // to 1 (opaque) in small steps every frame.
    function fadeInLoop() {
    	if (buttonOpacity < 1) {						// If the button hasn't been fully faded-in...
    		buttonOpacity += 0.005;						// ... increment the opacity a little
    		playButton.style.opacity = buttonOpacity; 	// ... and set the button's opacity
    		requestAnimFrame(fadeInLoop);				// Wait a frame for the next part of the fade.
    	} 
    }
    
    // When we go in/out of fullscreen, this function is run.
    // This is used so that we can toggle the "Fullscreen" button on or off.
    // (Obviously it not much use having it when we're already in fullscreen!) 
    function fullScreenToggled() {
    	if (isFullScreen()) {												// If we're in fullscreen
    		fullscreenButton.style.display = "none";						// ... make the fullscreen button disappear
    		fullscreenButton.removeEventListener('mousedown', fullscreen);	// ... and de-activate any events associated with it.
    		fullscreenButton.removeEventListener('touchend', fullscreen);
    	}
    	else {																// Other wise...
    		fullscreenButton.style.display = "block";
    	   	fullscreenButton.addEventListener('click',  fullscreen );		// ... make the fullscreen button re-appear
    	   	fullscreenButton.addEventListener('touchend',  fullscreen );	// ... and re-activate any events associated with it.
    	}
    }
    
    /**
     * Cross browser hack to detect if the browser is in fullscreen mode.
     * @private
     */
    function isFullScreen() {
    	return (
    			document.fullscreenElement ||
    			document.webkitFullscreenElement ||
    			document.mozFullScreenElement ||
    			document.msFullscreenElement
    	);
    }

};
