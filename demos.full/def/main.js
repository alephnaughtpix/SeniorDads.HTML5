SeniorDads.CreateNameSpace("SeniorDads.Demos");

/**
 * <h1>The 'Def Demo</h1>
 * <h2>By The Senior Dads</h2>
 * <p><em>var myDemo = new SeniorDads.Demos.DefDemo(placeholder, name, callbackOnEnd);</em></p>
 * <p>The Senior Dads "comeback" demo, released on 29 August 2015, at http://seniordads.atari.org/demos/def.html .</p>
 * <p>This demo is based on the CODEF framework, and the 'Senior Dads Advanced Demo System'.</p>
 * @param {DOM object} placeholder HTML element from the web page to put the player in
 * @param {string} name Unique name for the demo element
 * @param {function} [callbackOnEnd] function to call when the demo ends
 * @property {int} width width of demo screen (640px)
 * @property {int} height height of demo screen (400px)
 * @property {string} blah Hidden message!
 * @constructor 
 * @class Senior Dads 'Def Demo
 * @example
 * 	<html><head><script language="javascript">
 *  // Simple example, which just loads and starts the demo.
 *  var demo;
 * 
 *  function startDemo() {
 *  	demo = new SeniorDads.Demos.DefDemo(document.getElementById('demo'), 'democanvas', finished);
 *  	demo.LoadAndStart();
 *  }
 *  
 *  function finished() {
 *  	alert('Demo is finished!');
 *  }
 *  </script></head>
 *  <body onload="startDemo();"><div id="demo"></div></body>
 *  </html>
 */
SeniorDads.Demos.DefDemo = function(placeholder, name, callbackOnEnd) {
    this.blah = "y333Ah!!! w3:R3 bAcK!!!!!1!!1! tH3 m3GaM1gHt33 *s3N10r dAdZ* rUl3c!!!!! IN CODEF!!!!!!";
    if (callbackOnEnd === undefined) callbackOnEnd = null;		// Default value if no callback set
    var DEBUG = true;						// Set to true for stats and debugging info.
    var defDemo,							// Demo variables
    	demoWindow,
    	loader,
    	presentsScreen,
    	mainScreen,
    	scrollScreen,
    	scrollOffScreen,
    	scrollBackScreen,
    	scrollBackWobbler,
    	scrollLine,
    	music_Sashy,
    	music_rasero,
    	SDPresents,
    	SDFont, 
    	SDLogo, 
    	SDLogoScreen,
    	SDLogoWobbler,
    	SDDistyDad,
    	SDDistyDadOffScreen,
    	SDDistyDadFX,
    	scrollyWibbles,
    	scrollFx,
    	diskbob,
    	diskbobScreen,
    	backGradientTopScreen,
    	backGradientBottomScreen,
    	SDStarfield,
    	colourBar,
    	titleDef,
    	titleDemo,
    	titleDefScreen,
    	titleDemoScreen,
    	rasterBar1Screen,
    	rasterBar2Screen,
    	rasterBar3Screen,
    	rasterWobbler1,
    	rasterWobbler2,
    	rasterWobbler3,
    	backDropImages,
    	backDropScreen,
    	backDropWobbler,
    	atariBob,
    	phase4bob,
    	spriteWobblers,
    	dadCubeVert,
    	dadCubeObj,
    	dadCubeFace1,
    	dadCubeFace2,
    	dadCubeFace3,
    	dadCubeFace4,
    	dadCubeFace5,
    	dadCubeFace6,
    	dadCube3D,
    	dadCubeMainWobble,
    	dadCubeHoldWobble,
    	dadCubeHoldRotWobble,
    	copperSource,
    	copperScreen,
    	vectorDiskS,
    	vectorDiskD,
    	vectorDiskImgS,
    	vectorDiskImgD,
    	vectorDiskSWobble,
    	vectorDiskDWobble,
    	creditsScreenText,
    	creditsWobbler,
    	currentPart,
    	nextButton,
    	endSample,
    	endSampleLoader,
        sampleWave,
        samplePlayer,
        nextButton,
        fullscreenButton
    	;
	var currentPos = 0;									// Current position of main demo schedule
    var maxDiskfieldDepth = 32;							// Maximum z depth of 3D diskfield
    var noOfDisks = 128;								// No of disks in 3D diskfield
    var noOfSprites = 8;								// No of sprites for "Bobs" section
    var rgbBlack = '#000000';							// Common colour values
    var rgbWhite = '#ffffff';
    var clear = "rgba(0,0,0,0)";
	var scrollBackSegmentHeight = 160;					// Height of background for ChromaKey DistyScroll
    var zIndex = 1;										// Initialise z-index for various demo layers
    var diskFieldCoordinates = new Array(noOfDisks);	// Initialise coordinates array for 3D diskfield
    var loadedCallback = null;							// Inialise default callback for when resources are loaded. (ie none)
    defDemo = new SeniorDads.Demos.Demo(null, load, init, endDemo, callbackOnEnd);		// Create demo object
    defDemo.add( new SeniorDads.Demos.Demo.DemoPart( null, mainDemo, mainDemoAbort) );	// Add main screen
    defDemo.add( new SeniorDads.Demos.Demo.DemoPart( null, credits, creditsAbort) );	// Add credits screen
    defDemo.add( new SeniorDads.Demos.Demo.DemoPart( null, endCrash, null) );			// Add end crash.
    
    // Set up demo methods
	/**
	 * Load the demo resources.
	 * @function
	 */
    this.Load = defDemo.load;
	/**
	 * Load and start the demo.
	 * @function
	 */
    this.LoadAndStart = defDemo.loadAndStart;
	/**
	 * Initialise and start the demo. (assuming the resources have been loaded.)
	 * @function
	 */
    this.Start = function() { defDemo.init(); defDemo.start(); };
	/**
	 * Go to the next screen on the demo.
	 * @function
	 */
    this.Next = defDemo.next;
	/**
	 * Abort the demo
	 * @function
	 */
    this.Abort = defDemo.abort;
	/**
	 * Set the demo to fullscreen.
	 * @function
	 */
    this.fullscreen = function() { demoWindow.fullscreen(); };
    // Remaining demo properties
    this.width = 640;
    this.height = 400;

    // DEMO LOADER ===========================================================================================
    // 
    // Load all the resources we need for the demo before initialisation.
    function load(altLoadedCallback) {
        if (!(altLoadedCallback === undefined)) loadedCallback = altLoadedCallback;		// if we've been passed a callback, set that up
        demoWindow = new SeniorDads.ScreenHandler(placeholder, name, 640, 400);			// Set up main demo window
        music_Sashy = new SeniorDads.Music("MOD", DEMO_ROOT + "/def/resources/sashy_fanfare.bin", true);		// Main demo music
        music_rasero = new SeniorDads.Music("YM", DEMO_ROOT + "/def/resources/rasero_ym.bin", false);			// Credits music
        endSampleLoader = new SeniorDads.Loader.Binary( DEMO_ROOT + "/def/resources/colend.bin", endSample,		// End crash sample (A dump of the atari Falcon 030 low memory!)
                function (buffer) {
        			endSample = buffer;
                }
            );
        // Now start tracking the loading of resources. We've included all the images we're using 
        // with the CODEF routines, as this will ensure we've preloaded them beforehand.
        loader = new SeniorDads.Loader([
            music_Sashy,
            music_rasero,
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/senior.png"),
            new SeniorDads.Image(DEMO_ROOT + "/common/resources/largeFont.png"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/dad_logo.gif"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/logo.gif"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/title_def.png"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/title_demo.png"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/disk2.gif"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/disk3.gif"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/disk4.gif"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/netbest_back.jpg"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/sad_back3.jpg"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/sad_back.gif"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/feat_back.jpg"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/ptrail_bkg.gif"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/oldfart.jpg"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/dodgit.jpg"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/damevera.jpg"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/jpollock.jpg"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/colostomy.gif"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/trump.png"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/atari.gif"),
            new SeniorDads.Image(DEMO_ROOT + "/def/resources/phase4.gif"),
            endSampleLoader
        ], loadedCallback, null);
    }
        
    // DEMO INITIALISATION ===================================================================================
    // 
    // As you can see, we're doing a lot of precalculating here...
    function init() {
    	if (DEBUG) addstats();		// If we're in debug mode, we'll be showing the stats
    	introScreen();
    	backdrop();
    	coppers();
    	rasterBars();
    	backGradient();
    	// Initialise main canvas for the main screen.
    	mainScreen = SeniorDads.ScreenHandler.Codef(640,400,name,zIndex++);
    	mainScreen.contex.imageSmoothingEnabled = false;
    	mainScreen.contex.mozImageSmoothingEnabled = false;
    	mainScreen.contex.oImageSmoothingEnabled = false;
    	starfield();
    	title();
    	logo();
    	sprites();
    	scroller();
    	diskField();
    	distyDad();
    	colourBars();
    	dadCube();
    	vectorDisks();
    	makeNextButton();
    	
    	// "Senior Dads presents" screen.
    	function introScreen() {
            SDPresents = new image(DEMO_ROOT + "/def/resources/senior.png");
            presentsScreen = SeniorDads.ScreenHandler.Codef(640,400,name,zIndex++);
    		SDPresents.draw(presentsScreen,0,0);
    	}
    	
    	// The "wobbly" backdrop screens
    	//
    	// these are various screen which are slightly larger than the demo screen, which 
    	// copied onto the main screen with a "wobbly" offset.
    	function backdrop() {
    		backDropImages = new Object();				// Hash Array of backdrop images
    		var getName = /resources\/(\w+)\.\w+/i;		// Regex to make unique hash array name for each image
    		// Array of image URLS for the backdrops
    		var imageList = ["resources/netbest_back.jpg","resources/sad_back3.jpg","resources/sad_back.gif","resources/feat_back.jpg","resources/ptrail_bkg.gif","resources/trump.png"];
    		// Go through each image and make canvas for them, and pop it into the backdrop array
    		for ( var i = 0; i < imageList.length; i++ ) {
        		var scratchPad = new canvas(650,410);	// Image canvases are slightly larger than 640x400 to make some "wobble" room.
    			var tempImage = new image(DEMO_ROOT + "/def/" + imageList[i]);	// Load image
    			var tempImageName = imageList[i].replace(getName, "$1" );		// Make unique hash array name for image
    			if ((tempImage.img.width <= 650)||(tempImage.img.width <= 410)) {	// If image is smaller than the canvas, tile it across canvas
    				var x = y = 0;
    				while (y < 410) {
    					while (x < 650) {
    						tempImage.draw(scratchPad,x,y);
    						x += tempImage.img.width;
    					}
    					x = 0;
    					y += tempImage.img.height;
    				}
    			}
    			backDropImages[tempImageName] = scratchPad;		// Now put canvas into Hash Array of backdrop images
    		}
    		backDropImages["presents"] = presentsScreen;		// Put "Senior Dads present" screen into array as well (for the end of the main screen)
			backDropScreen = SeniorDads.ScreenHandler.Codef(640,400,name,zIndex++);		// Create backdrop destination canvas for main screen.
			backDropWobbler = new SeniorDads.Wobbler(									// Create wobbler for backdrop
    				[
    				 	{value: 0, amp: 5, inc:0.30},
    				 	{value: 0.5, amp: 5, inc:0.30}
    				],
    				[
	 				 	{value: 0.5, amp: 3, inc:0.20},
	 				 	{value: 0, amp: 2, inc:0.10}
	 				]);
    	}
    	
    	// Initialise "burpy coppers".
    	//
    	// The "coppers" are a single long gradient image, which is then copied multiple times onto the screen.
    	function coppers() {
        	copperSource = new canvas(1,480);	// As the coppers are vertical, we only need to make the screen 1px wide.
        	copperScreen = SeniorDads.ScreenHandler.Codef(640,400,name,zIndex++);	// Initialise coppers canvas
        	makeGradient( copperSource,												// Make gradient for coppers and draw onto source canvas
            		[ rgbBlack,  rgbBlack, '#ff8800', 
            		  rgbBlack,  rgbBlack, '#44ff88',
            		  rgbBlack,  rgbBlack, '#4488ff',
            		  rgbBlack,  rgbBlack, '#ff88c8',
            		  rgbBlack,  rgbBlack ]
            ).drawH();
    	}
    	
    	// Initalise ChromaKey DistyScroll.
    	//
    	// The scroller is given a y-dist, and a background is projected "through" it. Throughout the course
    	// of the demo, we scroll through different backgrounds, and the background itself wobbles. So first
    	// we have to initalise the scroller, it's y-dist, and the various backgrounds.
    	function scroller() {
            SDFont = new image(DEMO_ROOT + "/common/resources/largeFont.png");		// Get the source font image
        	SDFont.initTile(32,16,32);												// Set up the font
        	scrollScreen = new canvas(640,140);										// Set the main scroll screen (after dist)
        	scrollOffScreen = new canvas(640,32);									// Set the inital scroll screen (pre dist)
        	scrollBackScreen = new canvas(640,scrollBackSegmentHeight * 7);			// Set the background source screen
        	var backgroundTempScreen = new canvas(640, scrollBackSegmentHeight );	// Set the temp screen for the various background segements
        	scrollLine = new scrolltext_horizontal();								// Set up the scroller object
            scrollyWibbles=[														// Set up the y-dist parameters
                           {value: 0, amp: 20, inc:0.03, offset: -0.05},
                           {value: 0, amp: 35, inc:0.01, offset: -0.04}
                         ];
            // Set up the scrolltext!
        	scrollLine.scrtxt = 
        		".   .  . . ...... YEEEEEAAAHH!!!! THE DADS ARE BACK!!!!^P2 " +
        		"WITH A NEW CODEF-TRO CALLED... . .  .                         ^P7" +
        		"RELEASED 29 AUG 2015!^P3!!!!! " +
        		"Rejoice!!!!! ^P2 " +
        		"If u think this is YouTube, your so wrong!!!! This detnro is happening now on your browsey-wowsey!!!!!!! " +
        		"Ja!!!! Dis CODEC is CODED by our CODEEs in CODEF!!!!!       And Javascript, obviously.            " +
        		"CREDITS!!!!!     Code(f!!) by OLD FART & DODDERING GIT!!!     Art by JACKSON POLLOCK!!!!    DJ MusixMix by DAME VERA LYN!!!!!   " +
        		".   .  . . ...... Welcome to our first demo of the millenium!!!! We wanted to do an Atari prod for our 20th Anniversary!! Then we saw someone did an Atari demo on a webpage!!!! So we thot: 'Hay!!! Let's do that!!!!'!! " +
        		"So we toiled for yonks to learn tha CODEF, and here are our first fruits of our labour!!!!! This CODEF/JS/HTML5 malarkey was a bit funy at first- like doing a fullscreen in Turbo Pascal!!!! In fact, you can't even do fullscreen by flipping to 60Hz like on the old Atarri!!!!! " +
        		"If you havent seen our Atari demoes (Where you been!!!), get thee to our w3sitey at " +
        		"seniordads.atari.org ^P3!!!!!!! " +
        		"and you can run them in Atari emulators!!!        And soon- IN HTML5!!!!!!!!!^P2      " +
        		"This is just a simple demo of wot we can do in 'def- nearly all the GFX is old stuff by Jackson Pollock for our website, and the DJ mix was done by Dame Vera Lynn at the Reservoir Gods Cwmvention in 1997!!!!    Our next newie will contain all new GFX, Zix, and FX!!!!!!         So watch out!!!!!!!     " +
        		" THE SENIOR DADS!! If it's too old, you're loud!!!!!!!!!!          Go on, press space bar, you div!!!!!!       " +
        		" ";
            scrollFx = new FX(scrollOffScreen,scrollScreen,scrollyWibbles);			// Set up the y-dist
        	scrollLine.init(scrollOffScreen,SDFont,5);								// initalise the scroller
        	// Set up first background segment (gradient)
        	makeGradient( backgroundTempScreen,
            		[ rgbBlack, '#00FFFF', '#FF0000', '#00FF00', '#FF00FF', '#FFFF00', '#0000FF', rgbBlack ]
            	).drawH();
        	backgroundTempScreen.draw(scrollBackScreen,0,0);
        	// Set up second background segment (gradient)
        	makeGradient( backgroundTempScreen,
            		[ rgbBlack, '#FF4422', '#4422FF', '#FF4422', '#4422FF', '#FF4422',  rgbBlack]
            	).drawH();
        	backgroundTempScreen.draw(scrollBackScreen,0,scrollBackSegmentHeight);
        	// Set up third segment background segment ("Press Trail" backdrop)
        	backDropImages["ptrail_bkg"].drawPart(scrollBackScreen,0,scrollBackSegmentHeight*2,0,50,640,scrollBackSegmentHeight);
        	// Set up fourth background segment (gradient)
        	makeGradient( backgroundTempScreen,
            		[ rgbBlack, '#FFFF66', '#00FF00', '#FFFF66', '#FF0000', '#FFFF66', '#0088FF',  '#FFFF66', rgbBlack ]
            	).drawH();
        	backgroundTempScreen.draw(scrollBackScreen,0,scrollBackSegmentHeight*3);
        	// Set up fifth background segment (gradient)
        	makeGradient( backgroundTempScreen,
            		[ rgbBlack, rgbWhite, '#44FF88', rgbWhite, '#FF4488', rgbWhite, '#4488FF',  rgbWhite, rgbBlack ]
            	).drawH();
        	backgroundTempScreen.draw(scrollBackScreen,0,scrollBackSegmentHeight*4);
        	// Set up sixth segment background segment ("Trump" backdrop)
        	backDropImages["trump"].drawPart(scrollBackScreen,0,scrollBackSegmentHeight*5,0,50,640,scrollBackSegmentHeight);
        	// Set up seventh segment background segment ("Senior Dads presents" backdrop)
        	backDropImages["presents"].drawPart(scrollBackScreen,0,scrollBackSegmentHeight*6,0,50,640,scrollBackSegmentHeight);
        	// Set up wobbler for backdrop
        	scrollBackWobbler  = new SeniorDads.Wobbler([
 				 	{value: 0, amp: 3, inc:0.30},
 				 	{value: 0.5, amp: 3, inc:0.40}
 				]);
    	}
    	
    	// Initialise Beer rasters
    	//
    	// We've drawn them onto two canvases, so we have the option to switch top, bottom or both halves .
    	function backGradient() {
    		var gradientColour = '#FFCC55';	// Beer colour!
        	backGradientTopScreen = SeniorDads.ScreenHandler.Codef(640,200,name,zIndex++);		// Set up canvas for top half 	
        	backGradientBottomScreen = SeniorDads.ScreenHandler.Codef(640,200,name,zIndex++);	// Set up canvas for bottom half
    		makeGradient( backGradientTopScreen, [ gradientColour, clear ] ).drawH();			// Pre-draw gradient for top half
    		makeGradient( backGradientBottomScreen, [ clear, gradientColour ] ).drawH();		// Pre-draw gradient for bottom half
    		backGradientBottomScreen.y = 200;													// Position bottom half
    	}

    	// Initialise 2D starfield
    	function starfield() {
    		// Set up a 3 level startfield with 66 stars on each level
    		var noOfStars = 66;
    		var SDStarfieldParams=[
    		        {nb:noOfStars, speedy:0, speedx:-3.9, color: rgbWhite, size:2},
    		        {nb:noOfStars, speedy:0, speedx:-2.8, color:"#888888", size:2},
    		        {nb:noOfStars, speedy:0, speedx:-1.7, color:"#444444", size:2}
    		];
    		SDStarfield = new starfield2D_dot(mainScreen,SDStarfieldParams);
    	}
    	
    	// Initialise "'Def Demo" neon titles
    	//
    	// We've drawn them onto seperate canvases, so we can switch on either or both,
    	// in a "neon sign" stylee, such as in the "'Def.. Demo.." opening sequence.
    	function title() {
    		titleDef = new image(DEMO_ROOT + "/def/resources/title_def.png");					// Load images
    		titleDemo = new image(DEMO_ROOT + "/def/resources/title_demo.png");
    		titleDefScreen = SeniorDads.ScreenHandler.Codef(									// Set up "'Def" canvas
    				titleDef.img.width,
    				titleDef.img.height,
    				name, zIndex++, 
    				0,																			// Position on center left
    				200 - (titleDef.img.height /2)
    				);
    		titleDefScreen.hide();
    		titleDef.draw(titleDefScreen,0,0);													// Draw image onto canvas
    		titleDemoScreen = SeniorDads.ScreenHandler.Codef(									// Set up "Demo" canvas
    				titleDemo.img.width,
    				titleDemo.img.height,
    				name, zIndex++, 
    				640 - (titleDemo.img.width),												// Position on center right
    				200 - (titleDemo.img.height /2)
    				);
    		titleDemoScreen.hide();
    		titleDemo.draw(titleDemoScreen,0,0);												// Draw image onto canvas
    	}
    	
    	// Initialise Disty Dad
    	//
    	// Quite simple here, just set up an SD logo with a x-dist!
    	function distyDad() {
    		SDDistyDad = new image(DEMO_ROOT + "/def/resources/dad_logo.gif");					// Get image
    		SDDistyDadOffScreen  = new canvas(SDDistyDad.img.width,SDDistyDad.img.height);		// Set up pre-dist canvas
    		SDDistyDad.draw(SDDistyDadOffScreen, 0, 0);											// Draw Dad onto it
    		var FXparam=[																		// Set up x-dist parameters
    		   	        {value: 0, amp: 10, inc:0.03, offset: -0.05},
    		   	        {value: 0, amp: 10, inc:0.01, offset:  0.08}
    		   		];
    		SDDistyDadFX=new FX(SDDistyDadOffScreen,mainScreen,FXparam);						// Set up x-dist
    	}
    	
    	// Initialise top and bottom colour bars
    	//
    	// This is just a simple long canvas gradient which is copied and moved onto the main screen twice.
    	function colourBars() {
    		colourBar = new canvas(640*2, 2);		// Make it twice as long as the screen width
        	makeGradient( colourBar,				// Draw gradient twice onto it.
            		[ rgbBlack, '#00FFFF', '#FF0000', '#00FF00', '#FF00FF', '#FFFF00', '#0000FF', rgbBlack,
            		  '#00FFFF', '#FF0000', '#00FF00', '#FF00FF', '#FFFF00', '#0000FF', rgbBlack ]
            	).drawV();
    	}

    	// Initialise raster bars
    	//
    	// These are 3 canvases with the raster bars pre-drawn onto them, which are then moved 
    	// around in a raster bar stylee!
    	function rasterBars() {
    		var grad1Col = '#ff8844';				// Raster base colours (Rasters gradient is black->colour->white->colour->black)
    		var grad2Col = '#44ff88';
    		var grad3Col = '#8844ff';
    		rasterBar1Screen = SeniorDads.ScreenHandler.Codef(640,60,name,zIndex++);	// Set up raster canvases
    		rasterBar2Screen = SeniorDads.ScreenHandler.Codef(640,60,name,zIndex++);
    		rasterBar3Screen = SeniorDads.ScreenHandler.Codef(640,60,name,zIndex++);
    		
    		makeGradient( rasterBar1Screen, [ rgbBlack, grad1Col, rgbWhite, grad1Col, rgbBlack ] ).drawH();		// Pre-draw rasters onto canvases
    		makeGradient( rasterBar2Screen, [ rgbBlack, grad2Col, rgbWhite, grad2Col, rgbBlack ] ).drawH();
    		makeGradient( rasterBar3Screen, [ rgbBlack, grad3Col, rgbWhite, grad3Col, rgbBlack ] ).drawH();

    		rasterBar1Screen.x = rasterBar2Screen.x = rasterBar2Screen.x = 0;		// Set rasters to left of screen (We'll be setting the y coords later in the main demo).
    		
    		rasterWobbler1 = new SeniorDads.Wobbler(								// Set up y- wobbles for rasters
    				[
    				 	{value: 0, amp: 10, inc:0.30},
    				 	{value: 0.5, amp: 6, inc:0.40}
    				]);
    		rasterWobbler2 = new SeniorDads.Wobbler(
    				[
    				 	{value: 0, amp: 10, inc:0.25},
    				 	{value: 0.5, amp: 6, inc:0.35}
    				]);
    		rasterWobbler3 = new SeniorDads.Wobbler(
    				[
    				 	{value: 0, amp: 10, inc:0.20},
    				 	{value: 0.5, amp: 6, inc:0.40}
    				]);

    	}
    	
    	// Initiliase bouncy, wobbly "s3N10r dAdZ!!1!" logo
    	function logo() {
    		SDLogo = new image(DEMO_ROOT + "/def/resources/logo.gif");			// Get logo
    		SDLogoScreen = SeniorDads.ScreenHandler.Codef(						// Set up canvas for logo
    				SDLogo.img.width,
    				SDLogo.img.height,
    				name, zIndex++, 
    				320 - (SDLogo.img.width /2),								// Set center near-top
    				20
    				);
    		SDLogoScreen.hide();
    		SDLogo.draw(SDLogoScreen,0,0);										// Draw logo on canvas
    		SDLogoWobbler = new SeniorDads.Wobbler(								// Set up wobbler for logo
    				[
    				 	{value: 0, amp: 3, inc:0.30},
    				 	{value: 0.5, amp: 3, inc:0.40}
    				],
    				[
	 				 	{value: 0.5, amp: 3, inc:0.20},
	 				 	{value: 0, amp: 2, inc:0.10}
	 				]);
    	}
    	
    	// Initialise 3D diskfield
    	function diskField() {    		
    		diskbob = new image(DEMO_ROOT + "/def/resources/disk3.gif");		// Get disk and set up canvas
    		diskbobScreen = new canvas(34,37);
    		diskbob.draw(diskbobScreen,0,0);
	      	for( var i = 0; i < diskFieldCoordinates.length; i++ ){				// Set up random 3D coordinates for the diskfield
	      		diskFieldCoordinates[i] = {
		          	x: random(-25,25),
		          	y: random(-25,25),
		          	z: random(1,maxDiskfieldDepth)
	         	};
	      	}
    	}
    	
    	// Initialise "sprites" section.
    	//
    	// You might notice here we're using the Senior Dads Wobbler to generate 
    	// sprite movement paths AND wobbles!
    	function sprites() {
    		spriteWobblers = new Object();											// Set up arrays for the path/wobbles for each sprite
    		phase4bob = new image(DEMO_ROOT + "/def/resources/phase4.gif");			// Get the two sprites we've using this demo.
    		atariBob  = new image(DEMO_ROOT + "/def/resources/atari.gif");
    		var seperation = 0.30;													// Distance between sprites
    		var spritePosition = 0;													// Position in the path/wobble
    		for ( var i=0; i < noOfSprites; i++ ) {									// For each sprite, set up a path/wobble
        		spriteWobblers[i] = new SeniorDads.Wobbler(
        				[
	     				 	{value: spritePosition, amp: 240, inc:0.08},
	    				 	{value: spritePosition, amp: 20, inc:0.30}
        				],
        				[
	    				 	{value: spritePosition, amp: 120, inc:0.06},
	    				 	{value: spritePosition, amp: 20, inc:0.40}
        				]
        				);
        		spritePosition += seperation;										// Move along position in the path/wobble for next sprite.
    		}
    	}
    	
    	// Initliase Tri-Di Dad-Mapping
    	//
    	// This features all the members of the Senior Dads on each cube face!
    	function dadCube() {
    		dadCubeVert = new Object();				// Set up the cube vertices
    		dadCubeVert = [							// There are 8 points in the cube, so there 8 coordinates
    		             {x:-100, y: 100, z: 100},
    		             {x:-100, y:-100, z: 100},
    		             {x: 100, y:-100, z: 100},
    		             {x: 100, y: 100, z: 100}, 
    		             {x: 100, y: 100, z:-100},
    		             {x: 100, y:-100, z:-100},
    		             {x:-100, y:-100, z:-100},
    		             {x:-100, y: 100, z:-100}
    		            	];
    		// Now the images used on each face										   ## SD crew members #
        	dadCubeFace1 = new image(DEMO_ROOT + "/def/resources/oldfart.jpg");		// # Old Fart
        	dadCubeFace2 = new image(DEMO_ROOT + "/def/resources/dodgit.jpg");		// # Doddering git
        	dadCubeFace3 = new image(DEMO_ROOT + "/def/resources/damevera.jpg");	// # Dame Vera Lynn
        	dadCubeFace4 = new image(DEMO_ROOT + "/def/resources/jpollock.jpg");	// # Jackson Pollock
        	dadCubeFace5 = new image(DEMO_ROOT + "/def/resources/colostomy.gif");	// # Colostomy Bag ####
        	dadCubeFace6 = new image(DEMO_ROOT + "/def/resources/sad_back.gif");	// Generic SD background
    		dadCubeObj = new Object();	// Set up the faces of the cube
    		dadCubeObj=[ 
    		         {p1:0, p2:1, p3:2, p4:3, u1:0,v1:0, u2:0,v2:1, u3:0.52,v3:1, u4:0.52,v4:0, params:new MeshBasicMaterial({ map: new Texture( dadCubeFace1.img ) })},
    		         {p1:3, p2:2, p3:5, p4:4, u1:0,v1:0, u2:0,v2:1, u3:0.52,v3:1, u4:0.52,v4:0, params:new MeshBasicMaterial({ map: new Texture( dadCubeFace2.img ) })},
    		         {p1:7, p2:6, p3:1, p4:0, u1:0,v1:0, u2:0,v2:1, u3:0.52,v3:1, u4:0.52,v4:0, params:new MeshBasicMaterial({ map: new Texture( dadCubeFace3.img ) })},
    		         {p1:7, p2:0, p3:3, p4:4, u1:0,v1:0, u2:0,v2:1, u3:0.52,v3:1, u4:0.52,v4:0, params:new MeshBasicMaterial({ map: new Texture( dadCubeFace4.img ) })},
    		         {p1:1, p2:6, p3:5, p4:2, u1:0,v1:0, u2:0,v2:1, u3:0.52,v3:1, u4:0.52,v4:0, params:new MeshBasicMaterial({ map: new Texture( dadCubeFace5.img ) })},	
    		         {p1:4, p2:5, p3:6, p4:7, u1:0,v1:0, u2:0,v2:0.80, u3:1,v3:0.80, u4:1,v4:0, params:new MeshBasicMaterial({ map: new Texture( dadCubeFace6.img ) })}
    		 	];
    		dadCube3D = new codef3D(mainScreen, 900, 40, 1, 1600 );		// Set up code object
    		dadCube3D.faces4(dadCubeVert,dadCubeObj, false, true );
    		// Main cube path/wobble.
    		dadCubeMainWobble = new SeniorDads.Wobbler(
    				[
     				 	{value: 0, amp: 240, inc:0.08},
    				 	{value: 0.5, amp: 20, inc:0.30}
    				],
    				[
    				 	{value: 0, amp: 120, inc:0.06},
    				 	{value: 0.5, amp: 20, inc:0.40}
    				],
    				[
	 				 	{value: 0, amp: 200, inc:0.07}
 				 	]
    				);
    		// Wobble when the cube stops.
    		dadCubeHoldWobble = new SeniorDads.Wobbler(
    				[
     				 	{value: 0, amp: 5, inc:0.20},
    				 	{value: 0.5, amp: 10, inc:0.30}
    				],
    				[
    				 	{value: 0, amp: 10, inc:0.30},
    				 	{value: 0.5, amp: 5, inc:0.40}
    				]
    		);
    		// Woble when it's just about to tumble away.
    		dadCubeHoldRotWobble = new SeniorDads.Wobbler(
    				[
     				 	{value: 0, amp: 1, inc:0.20},
    				 	{value: 0.5, amp: 0.5, inc:0.30}
    				],
    				[
    				 	{value: 0, amp: 1, inc:0.30},
    				 	{value: 0.5, amp: 0.5, inc:0.40}
    				]
    				,
    				[
    				 	{value: 0, amp: 1, inc:0.35},
    				 	{value: 0.5, amp: 0.5, inc:0.45}
    				] 
    		);
    	}
    	
    	// Intialise 3D vectordisks
    	//
    	// There are two objects to set up here- an S shape and a D shape, each with different color disks
    	function vectorDisks() {
			/*
			 * First set up the S:
			 *   21012
			 *  2-####
			 *  1#----
			 *  0-###-
			 *  1----#
			 *  2####-
			 */
		    vectorDiskImgS = new Array();
		    vectorDiskImgS[0]=new image(DEMO_ROOT + "/def/resources/disk2.gif");
		    var vectorDiskSCoords=[
		           	            {x:-1, y:-2, z:0, img:0},	// Row 1: -####
		          	            {x:0, y:-2, z:0, img:0},
		          	            {x:1, y:-2, z:0, img:0},
		          	            {x:2, y:-2, z:0, img:0},
		          	            {x:2, y:-1, z:0, img:0},	// Row 2: #----
		          	            {x:-1, y:0, z:0, img:0},	// Row 3: -###-
		          	            {x:0, y:0, z:0, img:0},
		          	            {x:1, y:0, z:0, img:0},
		          	            {x:-2, y:1, z:0, img:0},	// Row 4: ----#
		           	            {x:-2, y:2, z:0, img:0},	// Row 5: ####-
		           	            {x:-1, y:2, z:0, img:0},
		           	            {x:0, y:2, z:0, img:0},
		           	            {x:1, y:2, z:0, img:0}
	        ];
	        vectorDiskS=new codef3D(mainScreen, 900, 35, 1, 1600 );
	        vectorDiskS.vectorball_img( vectorDiskSCoords, vectorDiskImgS );
	        vectorDiskS.group.scale.x = vectorDiskS.group.scale.y = vectorDiskS.group.scale.z = 60;
	        vectorDiskS.group.position.x = -240;		// Position centre left
	        /*
	         * Now the D:
	         *   21012
	         *   2####-
	         *   1#---#
	         *   0#---#
	         *   1#---#
	         *   2####-
	         */
		    vectorDiskImgD = new Array();
		    vectorDiskImgD[0]=new image(DEMO_ROOT + "/def/resources/disk4.gif");
		    var vectorDiskDCoords=[
	 	           	            {x:-2, y:-2, z:0, img:0},	// Row 1: ####-
		           	            {x:-1, y:-2, z:0, img:0},
		           	            {x:0, y:-2, z:0, img:0},
		           	            {x:1, y:-2, z:0, img:0},
	 	           	            {x:-2, y:-1, z:0, img:0},	// Row 2: #---#
	 	           	            {x:2, y:-1, z:0, img:0},
	 	           	            {x:-2, y:0, z:0, img:0},	// Row 3: #---#
	 	           	            {x:2, y:0, z:0, img:0},
	 	           	            {x:-2, y:1, z:0, img:0},	// Row 4: #---#
	 	           	            {x:2, y:1, z:0, img:0},
	 	           	            {x:-2, y:2, z:0, img:0},	// Row 5: ####-
		           	            {x:-1, y:2, z:0, img:0},
		           	            {x:0, y:2, z:0, img:0},
		           	            {x:1, y:2, z:0, img:0}
	        ];
	        vectorDiskD=new codef3D(mainScreen, 900, 35, 1, 1600 );
	        vectorDiskD.vectorball_img( vectorDiskDCoords, vectorDiskImgD );
	        vectorDiskD.group.scale.x = vectorDiskD.group.scale.y = vectorDiskD.group.scale.z = 60;
	        vectorDiskD.group.position.x = 240;				// Position centre right
	        // Initial "sway" wobble.
	        vectorDiskSWobble = new SeniorDads.Wobbler(
						[
		 				 	{value: 0, amp: 5, inc:0.20},
						 	{value: 0.5, amp: 10, inc:0.30}
						],
						[
						 	{value: 0, amp: 10, inc:0.30},
						 	{value: 0.5, amp: 5, inc:0.40}
						]
			);
	        vectorDiskDWobble = new SeniorDads.Wobbler(
					[
	 				 	{value: 0, amp: 5, inc:0.30},
					 	{value: 0.5, amp: 10, inc:0.20}
					],
					[
					 	{value: 0, amp: 10, inc:0.40},
					 	{value: 0.5, amp: 5, inc:0.30}
					]
	        );
	        // "Agitated" shaky wobble.
	        vectorDiskSWibble = new SeniorDads.Wobbler(
    				[
     				 	{value: 0, amp: 0.2, inc:0.20},
    				 	{value: 0.5, amp: 0.1, inc:0.30}
    				],
    				[
    				 	{value: 0, amp: 0.1, inc:0.30},
    				 	{value: 0.5, amp: 0.2, inc:0.40}
    				]
    				,
    				[
    				 	{value: 0, amp: 0.1, inc:0.35},
    				 	{value: 0.5, amp: 0.2, inc:0.45}
    				] 
    		);
	        vectorDiskDWibble = new SeniorDads.Wobbler(
    				[
     				 	{value: 0, amp: 0.2, inc:-0.20},
    				 	{value: 0.5, amp: 0.1, inc:-0.30}
    				],
    				[
    				 	{value: 0, amp: 0.1, inc:-0.30},
    				 	{value: 0.5, amp: 0.2, inc:-0.40}
    				]
    				,
    				[
    				 	{value: 0, amp: 0.1, inc:-0.35},
    				 	{value: 0.5, amp: 0.2, inc:-0.45}
    				] 
    		);
    	}
    	
    	// Set up the "Any Key" button below the demo. 
    	//
    	// This has two functions. First, to let the viewer know that there's a credit, and
    	// second, it allows the credits screen to be viewed on mobile devices, by clicking on 
    	// the button.
    	function makeNextButton() {
    		// Set up styling for the button
    	    var styleSheet = placeholder.parentNode.appendChild(document.createElement('style'));
    	    styleSheet.innerHTML = "#SpaceBar {color:#000000;text-align:center;margin-left:auto; margin-right:auto; border:none; width: 640px; background-color: #ff6688; font-family: Courier, sans-serif; font-size: 14px; font-weight:bold; cursor: pointer; text-transform:uppercase;}";
    	    // Now create the button element below the demo screen.
    	    nextButton = placeholder.parentNode.appendChild(document.createElement('div'));
    	    nextButton.type = "button";
    	    nextButton.innerHTML = "Press the any key for the Credits Screen!!!!!!";
    	    nextButton.id = "SpaceBar";
    	    nextButton.style.opacity = "0";							// Hide at first.
    	    nextButton.addEventListener('mousedown', spaceBar);		// Set up click events (Yes, you can click it even when it's hidden!)
    	    nextButton.addEventListener('touchend', spaceBar);
    	}
    	
    	// Make an evenly spaced CODEF gradient, given a list of colours
    	function makeGradient( targetScreen, rasterList ) {
        	return new grad( targetScreen, makeGradientColours( rasterList ) );
    	}
    	
    	// Make an array of gradient parameters, given a list of of gradient colours
    	//
    	// This works out the offsets for the gradients, assuming they are evenly spaced.
    	function makeGradientColours( rasterList ) {
    		var gradientConstruct = new Array();
    		var offsetIncrement = 1 / ( rasterList.length - 1 );	// Work out the offest spacing.
    		var currentOffset = 0;									// Start offset
    		for (var i = 0; i < rasterList.length; i++ ) {
    			gradientConstruct.push( { color: rasterList[i], offset: currentOffset } );	// Put in the current colour and the offset
    			currentOffset += offsetIncrement;											// Set offset for next colour
    		}
    		return gradientConstruct;
    	}
    	
    }

    // MAIN DEMO SCREEN ======================================================================================
    //
    // This sets up a lot of demo layers, which are turned on and off, or manipulated according to a schedule
    // tied to various pattern and track positions in the soundtracker module. The idea of turning demo layers on 
    // and off was partly inspired by Mellow Man's CODEF demo creator ( http://codef.namwollem.co.uk/codef_demo_maker.html )
    function mainDemo() {
    	// DEMO SCHEDULE:
    	//
    	// This a large JSON array of the form:
    	// var schedule = [
    	//		{ trackPos: [module track position], patternPos: [module pattern position], 
    	//			layers: { effect1: [...], effect2: [...]
    	//		}, 
    	//
    	//		[...]
    	// ];
    	//
    	// This allows us to turn on and off demo parts according to whether they "fit" the song at 
    	// the time. Note that the pattern position is actually the pattern position multipled by the
    	// number of "ticks" per position. In the case of this demo, the module timing is 4 ticks, so
    	// pattern position 64 is actually 64*4 = 256.
    	// 
    	// Note that you only need to specify the demo layer that you want to show. We'll be going into
    	// more detail about how those layers can be specified in the code for each of those demo layers.
    	//
    	// This schedule idea was really useful in making it easy to move demo parts around, and sync them
    	// with the music, so it might end up in TSDADS (The Senior Dads Advanced Demo System) in some form
    	// in the future.
    	
    	// First a couple of demo layers, we'll be using a number of times in the schedule.
    	var titleDefLayers = { 			// Scroller, starfield, colour, disty Dad, and "'DEF" logo
    			scroller:  true,  
	    	  	starfield: true,
	    	  	title:	   { def: true, demo: false },
	    	  	disty:     { animate: true },
	    	  	colourBar: { top: true, bottom: true }
	    	};
    	var titleDemoLayers = {  		// Scroller, starfield, colour, disty Dad, and "'DEMO" logo
    			scroller:  true,  
	    	  	starfield: true,
	    	  	title:	   { def: false, demo: true },
	    	  	disty:     { animate: true },
	    	  	colourBar: { top: true, bottom: true }
	    	};
    	var dadCubeLayers = {   		// Scroller, starfield, colour, non-disty Dad, and DadCube flying around
    			scroller:  true,  
	    	  	starfield: true,
	    	  	disty:     { animate: false },
	    	  	colourBar: { top: true, bottom: true },
	    	  	cube:	   { hold: false }
	    };
    	var dadCubeTrumpLayers = { 		// wobbly "Trump Hot Air Ballon" and scroller
	    		backdrop:  { name: "trump", wobble: true, animate: false },
	    		scroller:  true
	    };
    	var dadCubeHoldLayers = {    	// Scroller, starfield, colour, non-disty Dad, and DadCube stopping in mid air
	    		scroller:  true,
	    	  	starfield: true,
	    	  	disty:     { animate: false },
	    	  	colourBar: { top: true, bottom: true },
	    	  	cube:	   { hold: { on: true, rot: false, bye: false } }
	    };
    	var dadCubeHoldRotLayers = {    	// Scroller, starfield, colour, non-disty Dad, and DadCube wibbling about in fixed position
	    		scroller:  true,
	    	  	starfield: true,
	    	  	disty:     { animate: false },
	    	  	colourBar: { top: true, bottom: true },
	    	  	cube:	   { hold: { on: true, rot: true, bye: false } }
	    };
    	var endDefLayers = {  			// Scroller, diskfield, bottom beer rasters, non-disty Dad, and "'DEF" logo
				scroller:	{ back: 1 },  					// As the scroller was previously using background no. 7, this causes the scroller background to scroll through all the previous backgrounds!
	    		disty:	   	{ animate: false },
	    	  	backGrad:  	{ top: false, bottom: true },
	    	  	title:	   	{ def: true, demo: false },
	    	  	diskfield: 	true
    	};
    	var endDemoLayers = {   		// Scroller, diskfield, bottom beer rasters, non-disty Dad, and "DEMO" logo
	    		scroller:  true,
	    		disty:	   	{ animate: false },
	    	  	backGrad:  	{ top: false, bottom: true },
	    	  	title:	   	{ def: false, demo: true },
	    	  	diskfield: 	true
    	};
    	var endSpriteDefLayers = {    	// Atari sprites, scroller, diskfield, bottom beer rasters, non-disty Dad, and "'DEF" logo
	    		scroller:  true,
	    		disty:	   	{ animate: false },
	    	  	backGrad:  	{ top: false, bottom: true },
	    	  	title:	   	{ def: true, demo: false },
	    	  	sprites: 	{ bob: atariBob },
	    	  	diskfield: 	true
    	};
    	var endSpriteDemoLayers = {     // Atari sprites, scroller, diskfield, bottom beer rasters, non-disty Dad, and "DEMO" logo
	    		scroller:  true,
	    		disty:	   	{ animate: false },
	    	  	backGrad:  	{ top: false, bottom: true },
	    	  	title:	   	{ def: false, demo: true },
	    	  	sprites: 	{ bob: atariBob },
	    	  	diskfield: 	true
    	};
    	
    	// Now the actual main schedule. Here we go...
    	var schedule = [
    	        	    { trackPos: 0, patternPos: 0, layers: 					// As with the old Senior Dads Atari demos, it begins with the fanfare, and presents screen...
    	        	    	{ 
    	        	    	  	presents:  true,
    	        	    	  	loop:      false
    	        	    	} 
    	        	    },
    	        	    { trackPos: 1, patternPos: 0, layers: 					// But what's this? A logo's just plopped on screen!
		        	    	{ 
		        	    		presents:  true,  
		        	    	  	logo:      { animate: false, wobble: false },
    	        	    	  	loop:      false
		        	    	} 
		        	    },
		        	    { trackPos: 2, patternPos: 0, layers: 					// And now it's wobbling about!!!
		        	    	{ 
		        	    		presents:  true,  
		        	    	  	logo:      { animate: false, wobble: true }
		        	    	} 
		        	    },
		        	    { trackPos: 3, patternPos: 0, layers: 					// Now it's bouncing up and down!
		        	    	{ 
		        	    		presents:  true,  
		        	    	  	logo:      { animate: true, wobble: true }
		        	    	} 
		        	    },
		        	    { trackPos: 3, patternPos: 64, layers: 					// Now a wibbly scroller in funny colours has started to appear!
		        	    	{ 
		        	    		presents:  true,  
	        	    			scroller:  { back: 1 },  						// (The scroller's set to it's inital background of a gradient.)
		        	    	  	logo:      { animate: true, wobble: true }
		        	    	} 
		        	    },
    	        	    { trackPos: 5, patternPos: 224, layers: 				// First appearance of the disty Dad, but the other logo's covering it's face!
		        	    	{ 
	        	    			scroller:  true,  
		        	    	  	disty:     { animate: false },
		        	    	  	logo:      { animate: false, wobble: true }
		        	    	} 
		        	    },
    	        	    { trackPos: 7, patternPos: 0, layers: titleDefLayers }, 	// Now the title screen. 'DEF...
    	        	    { trackPos: 7, patternPos: 32, layers: titleDemoLayers }, 		// DEMO...
    	        	    { trackPos: 7, patternPos: 64, layers: titleDefLayers }, 		// 'DEF...
    	        	    { trackPos: 7, patternPos: 96, layers: titleDemoLayers }, 		// DEMO...
    	        	    { trackPos: 7, patternPos: 128, layers: titleDefLayers }, 
    	        	    { trackPos: 7, patternPos: 160, layers: titleDemoLayers }, 		// ... etc
    	        	    { trackPos: 7, patternPos: 192, layers: titleDefLayers },  
    	        	    { trackPos: 7, patternPos: 224, layers: titleDemoLayers }, 
    	        	    { trackPos: 8, patternPos: 0, layers: titleDefLayers }, 
    	        	    { trackPos: 8, patternPos: 32, layers: titleDemoLayers }, 		// Now you see why we defined these layers earlier!
    	        	    { trackPos: 8, patternPos: 64, layers: titleDefLayers }, 
    	        	    { trackPos: 8, patternPos: 96, layers: titleDemoLayers }, 
    	        	    { trackPos: 8, patternPos: 128, layers: titleDefLayers }, 
    	        	    { trackPos: 8, patternPos: 160, layers: titleDemoLayers }, 
    	        	    { trackPos: 8, patternPos: 192, layers: titleDefLayers }, 
    	        	    { trackPos: 8, patternPos: 224, layers: titleDemoLayers },
    	        	    { trackPos: 9, patternPos: 0, layers: 							// Brief shot of both 'DEF and DEMO visible.
		        	    	{ 
    	    					scroller:  { back: 2 },  								// (Scroller set to go to new gradient background)
		        	    	  	title:	   { def: true, demo: true },
		        	    	  	disty:     { animate: false }
		        	    	} 
		        	    },
    	        	    { trackPos: 10, patternPos: 0, layers: 							// COPPER PIPES!!!
		        	    	{ 
		        	    		backdrop:  { name: "netbest_back", wobble: true, animate: true },	// Fling up the "NetBest" background
	        	    			scroller:  true,  
		        	    	  	logo:      { animate: true, wobble: true },							// Bounce the logo up and down
		        	    	  	rasterBar: { wobble: true }											// Copper pipes in the background
		        	    	} 
		        	    },
    	        	    { trackPos: 12, patternPos: 0, layers: 						// DRUNKEN DAD!!!
		        	    	{ 
	    						scroller:  { back: 3 },  								// Scroller goes to green (Groo!!) background
		        	    	  	backGrad:  { top: true, bottom: true },					// switch on both halves of beer raster background
		        	    	  	disty:     { animate: true },							// Disty Dad for drunken look!!
		        	    	  	diskfield: true											// Switch on diskfield. His mind is full of code as he staggers home from the pub!!!
		        	    	} 
		        	    },
    	        	    { trackPos: 16, patternPos: 32, layers: 						// Quick pause for breath...
		        	    	{ 
    							scroller:  { back: 4 },  								// Cue up next scroller background.
		        	    		loop:      false
		        	    	} 
		        	    },
    	        	    { trackPos: 17, patternPos: 0, layers: 							// PHASE FOUR STEREO!!!
		        	    	{ 
		        	    		backdrop:  { name: "sad_back", wobble: true, animate: true },	// Fling up SD Website Background.
		        	    		sprites:  true,  												// Switch on sprites, which as set to "Phase 4 Stereo" bobs.
	        	    			scroller:  true,  
		        	    	  	logo:      { animate: true, wobble: true }						// Bounces goes the logo!
		        	    	} 
		        	    },
		        	    { trackPos: 21, patternPos: 0, layers: 						// Another slight pause, before we go to...
		        	    	{ 
		        	    		backdrop:  { name: "sad_back", wobble: false, animate: false },	
		        	    		sprites:  true,  
    							scroller:  { back: 5 },  								// (Cue up next scroller background.)
		        	    	  	logo:      { animate: false, wobble: false }			// (Logo goes back up top and freezes)
		        	    	} 
		        	    },
		        	    { trackPos: 22, patternPos: 0, layers: dadCubeLayers},		// WE 'TRUMP' IN 3D!!!!!!! A 3d Dad-Mapped cube flying about a starfield!!!
		        	    { trackPos: 22, patternPos: 48, layers: dadCubeTrumpLayers},	// (BURP!)
		        	    { trackPos: 22, patternPos: 64, layers: dadCubeLayers},
		        	    { trackPos: 22, patternPos: 112, layers: dadCubeTrumpLayers},	// (BURP!)
		        	    { trackPos: 22, patternPos: 128, layers: dadCubeLayers},
		        	    { trackPos: 22, patternPos: 208, layers: dadCubeHoldLayers},	// 'I'm calling fo-o-o-o-o-o...' The cube suddenly stops and wobbles!!!
		        	    { trackPos: 23, patternPos: 0, layers: dadCubeLayers},			// And the cube is off again...
		        	    { trackPos: 23, patternPos: 48, layers: dadCubeTrumpLayers},	// (BURP!)
		        	    { trackPos: 23, patternPos: 64, layers: dadCubeLayers},
		        	    { trackPos: 23, patternPos: 112, layers: dadCubeTrumpLayers},	// (BURP!)
		        	    { trackPos: 23, patternPos: 128, layers: dadCubeLayers},
		        	    { trackPos: 23, patternPos: 208, layers: dadCubeHoldLayers},	// 'I'm calling fo-o-o-o-o-o...' The cube's stopped again!!!!
		        	    { trackPos: 24, patternPos: 0, layers: dadCubeHoldRotLayers},	// ...o-o-o-o-o-o-o-o-o-o-o...' Now it cube's spinning like a madman!!!
		        	    { trackPos: 24, patternPos: 128, layers: 						// And it's tumbling away! Goodbye, cube!
		        	    	{ 
        	    				scroller:  { back: 6 },  								// (Set up next scroller background. It's actually the Trump Picture from the last section!!)
			    	    	  	colourBar: { top: true, bottom: true },
			    	    	  	diskfield: false,
			    	    	  	cube:	   { hold: { on: true, rot: true, bye: true } }
		        	    	} 
		        	    },
		        	    { trackPos: 25, patternPos: 0, layers: 							// BURPY COPPER BARS!!!
		        	    	{ 
			    	    		coppers:   true,
        	    				scroller:  true,  
			    	    	  	logo:      { animate: true, wobble: true },				// Bouncing logo is back!
			    	    	  	colourBar: { top: true, bottom: true }					// The colour bars remain from the previous section
		        	    	} 
		        	    },
		        	    { trackPos: 27, patternPos: 0, layers: 						// But that's not all.. VECTOR DISKS as well!
		        	    	{ 
			    	    		coppers:   true,
			    	    		scroller:  true,  
			    	    	  	logo:      { animate: true, wobble: true },
			    	    	  	colourBar: { top: true, bottom: true },
		        	    	  	vectaDisk: true											// Just start them off with the normal rotation
		        	    	} 
		        	    },
		        	    { trackPos: 30, patternPos: 0, layers: 						// Hang on, they're starting to look agitated!
		        	    	{ 
			    	    		coppers:   true,
			    	    		scroller:  true,  
			    	    	  	logo:      { animate: true, wobble: true },
			    	    	  	colourBar: { top: true, bottom: true },
		        	    	  	vectaDisk: { wibble: true }								// Turn on "agitated" wobble
		        	    	} 
		        	    },
		        	    { trackPos: 32, patternPos: 0, layers: 						// Back to the cube, but with a different background.
		        	    	{ 
    	    					scroller:  { back: 7 },  											// Use the "Presents" background for the scroller background here
		        	    		backdrop:  { name: "ptrail_bkg", wobble: true, animate: true },		// Fling up "Press Trail" background.
			    	    		cube: 	   	true
		        	    	} 
		        	    },
		        	    { trackPos: 33, patternPos: 0, layers: 						// Wait a sec, a (non-disty) Dad has appeared!
		        	    	{ 
			    	    		scroller:  	true,  
		        	    		backdrop:  	{ name: "ptrail_bkg", wobble: true, animate: true },
		        	    		disty:		{ animate: false },
			    	    		cube: 	   	true
		        	    	} 
		        	    },
		        	    { trackPos: 34, patternPos: 0, layers: 						// Oh, it's gone away again!
		        	    	{ 
			    	    		scroller:  	true,  
		        	    		backdrop:  	{ name: "ptrail_bkg", wobble: true, animate: true },
			    	    		cube: 	   	true
		        	    	} 
		        	    },
		        	    { trackPos: 35, patternPos: 0, layers: 						// Now, it's back again, only with the 3D diskfield and top half of the beer rasters
		        	    	{ 
	    						scroller:	true,  
		        	    		backdrop:  	{ name: "ptrail_bkg", wobble: true, animate: true },
		        	    		disty:	   	{ animate: false },
		        	    	  	backGrad:  	{ top: true, bottom: false },
		        	    	  	diskfield: 	true,
			    	    		cube: 	   	true
		        	    	} 
		        	    },															// Back to the 'Def demo titles, only with the diskfield and (bottom half) beer rasters.
		        	    { trackPos: 36, patternPos: 0, layers: endDefLayers },		// 'DEF...
		        	    { trackPos: 36, patternPos: 64, layers: endDemoLayers },	// 'DEMO..
		        	    { trackPos: 36, patternPos: 128, layers: endDefLayers },	// 'DEF...
		        	    { trackPos: 36, patternPos: 192, layers: endDemoLayers },	// 'DEMO..
		        	    { trackPos: 37, patternPos: 0, layers: endDefLayers },
		        	    { trackPos: 37, patternPos: 64, layers: endDemoLayers },	// .. etc. ...
		        	    { trackPos: 37, patternPos: 128, layers: endDefLayers },
		        	    { trackPos: 37, patternPos: 192, layers: endDemoLayers },
		        	    { trackPos: 38, patternPos: 0, layers: endSpriteDefLayers },	// Now, we're adding the "Atari" sprites!
		        	    { trackPos: 38, patternPos: 64, layers: endSpriteDemoLayers },
		        	    { trackPos: 38, patternPos: 128, layers: endSpriteDefLayers },
		        	    { trackPos: 38, patternPos: 192, layers: endSpriteDemoLayers },
		        	    { trackPos: 39, patternPos: 0, layers: endSpriteDefLayers },
		        	    { trackPos: 39, patternPos: 64, layers: endSpriteDemoLayers },
		        	    { trackPos: 39, patternPos: 128, layers: endSpriteDefLayers },
		        	    { trackPos: 39, patternPos: 192, layers: endSpriteDemoLayers },
		        	    { trackPos: 40, patternPos: 0, layers: 					// Take out the diskfield and 'DEF/DEMO, and replace with the vector disks
		        	    	{ 
	    						scroller:   { back: 7 }, 							// Go to "Presents" background. Background was previously no. 1, so this scrolls through all the backgrounds again! 
			    	    		disty:	   	{ animate: false },
			    	    	  	backGrad:  	{ top: false, bottom: true },
			    	    	  	sprite: 	{ bob: atariBob },
			    	    	  	vectaDisk:  true
		        	    	} 
		        	    },
		        	    { trackPos: 40, patternPos: 240, layers: 				// Fling up "Presents" background, which slightly mis-matches with scroller background!
		        	    	{ 
			    	    		scroller: 	true,  
		        	    		backdrop: 	{ name: "presents", wobble: false, animate: true },
			    	    	  	sprite: 	{ bob: atariBob },
		        	    	  	logo:      	{ animate: true, wobble: true },
			    	    	  	vectaDisk:  true
		        	    	} 
		        	    },
		        	    { trackPos: 41, patternPos: 0, layers: 					// Just leave the frozen logo, and frozen (mismatched) scroller
		        	    	{ 
		    	    			scroller: 	true,  
		        	    		presents:  true,  
		        	    	  	logo:      { animate: false, wobble: false },
		        	    	  	loop:      false 
		        	    	} 
		        	    },
    	        	    { trackPos: 42, patternPos: 0, layers: 					// Now, take everything away apart from the "Presents" screen. Now we're back at the start!
		        	    	{ 
		        	    		presents:  	true,  
		        	    		loop:      	false 
		        	    	} 
		        	    },
    	        	    { trackPos: 42, patternPos: 128, layers: 				// Whilst we're waiting for the music to restart, bring up the "Any Key" button.
		        	    	{ 
    	        	    		spacebar: 	true,
		        	    		presents:  	true,  
		        	    		loop:      	true 
		        	    	} 
		        	    }
    	];

    	// MAIN DEMO INITIALISATION
    	var loopOn = true;								// If true, the animation loop is on.
    	var logoY = 50;									// Y-pos of wobbly logo
    	var logoPos = 1.8;								// Sinewave position of wobbly logo
    	var backDropY = 405;							// Current y-pos of backdrop
    	var backdropCleared = true;						// True if we don't need to clear the backdrop canvas before drawing
    	var copperY = 0;								// y-pos of "burpy" copper source
    	var currentScrollBackPos = 10;					// Base y-position of scroller background
    	var nextScrollBackPos = currentScrollBackPos;	// Next y-position of scroller background
    	var colourBarSpeed = 2;							// Speed of movement of top and bottom colour bars
    	var colourbarXTop = 0;							// X-position of colour bar soure for top colour bar
    	var colourbarXBottom = 0;						// X-position of colour bar soure for bottom colour bar
    	var rasterBar1Y = 100; 							// Y-pos of copper pipes
    	var rasterBar2Y = rasterBar1Y;
    	var rasterBar3Y = rasterBar1Y;
    	var rasterBarSpacing = 0.60;					// Spacing between copper pipes
    	var rasterBarSpeed = 0.050;						// Speed of copper pipes movement
    	var rasterBar1Pos = 1.8;								// Inital sinewave pos of copper pipes
    	var rasterBar2Pos = rasterBar1Pos + rasterBarSpacing;
    	var rasterBar3Pos = rasterBar2Pos + rasterBarSpacing;
    	var dadCubeX = 0;										// Inital coordinates of DadCube
    	var dadCubeY = 0;
    	var dadCubeRotX = 0;									// Inital rotation of DadCube
    	var dadCubeRotY = 0;
    	var dadCubeRotZ = 0;
    	var vectorDiskSX = vectorDiskS.group.position.x;		// Inital coordinates of vector disks (We're not going to be fiddling with the z-coords in this case.)
    	var vectorDiskSY = vectorDiskS.group.position.y;
    	var vectorDiskDX = vectorDiskD.group.position.x;
    	var vectorDiskDY = vectorDiskD.group.position.y;
    	var vectorDiskSRotX = 0;								// Inital rotation of vector disks
    	var vectorDiskSRotY = 0;
    	var vectorDiskSRotZ = 0;
    	var vectorDiskDRotX = 0;
    	var vectorDiskDRotY = 0;
    	var vectorDiskDRotZ = 0;
    	var currentBob = phase4bob;								// Set the current bob for the Sprites screen
    	var spacebarOpactity = 0;								// Opacity of the "Any Key" button. (We've set it to clear.)
    	
    	// OK, LET'S GO!!!!!!!!!!
    	music_Sashy.play();							// Start the music playing
    	currentPart = schedule[currentPos].layers;	// Get the inital demo part
    	scheduleNextPart();							// Schedule the next part    	
    	window.onkeypress = mainDemoAbort;			// Set the "any key" to go to the end of this part, and then onto the credits screen
    	demo_loop();								// Now start the demo loop!
    	
    	// MAIN DEMO LOOP
    	//
    	// This simply goes through all the effects layers, and checks if needs to continue. 
    	// If it does, this function will be called again in the next frame.
        function demo_loop(){
        	draw_mainScreen();
        	draw_presentsScreen();
        	draw_backDrop();
        	draw_coppers();
        	draw_sprites();
        	draw_backGradient();
        	draw_starfield();
        	draw_title();
        	draw_diskField();
        	draw_vectorDisks();
        	draw_distyDad();
    		draw_logo();
    		draw_rasterBar();
    		draw_dadCube();
    		draw_colourBar();
        	draw_scroller();
        	display_spacebar();
        	if (DEBUG) updatestats();				// If we're in debug mode, show the stats.
        	checkContinue();						// If we're continuing, this will call the demo loop in the next frame.
        }
        
        // DEMO SCHEDULING
        //
        // This pops off the track and pattern positions for the next part, and uses it to set the next
        // part to occur when the music reaches that point. (The Senior Dads Music player class allows
        // to set a "breakpoint" so that a function is executed when a tracker module gets to a certain position.)
        function scheduleNextPart() {
        	if ((currentPos+1) < schedule.length) {				// If we're not at the end of schedule...
	        	SeniorDads.Music.SetBreakPoint(						// Set the next part to execute at the next music breakpoint.
	    			schedule[currentPos+1].trackPos, 
	    			schedule[currentPos+1].patternPos, 
	    			doNextPart
	        	);
	        	if (DEBUG) 			// If we're debugging, display when the next part is going to happen.
		        	document.getElementById('scheduleInfo').innerHTML = "<br/><br/>Playing schedule part " + currentPos + " of " + schedule.length +
	        		". Next part will be played at module position track " + SeniorDads.Music.BreakPoint_Track +", position " + SeniorDads.Music.BreakPoint_Pattern + 
	        		". ";
        	}
        	else {		// If we're at the end of the schedule, reset schedule/
        		if (DEBUG) document.getElementById('scheduleInfo').innerHTML = "<br/><br/>End of schedule. Resetting. ";	// If we're debugging, display that we're at the end of schedule
        		resetContent();						// Reset any content that needs reset
				currentPos = 0;						// Reset schedule pointer
	        	SeniorDads.Music.SetBreakPoint(		// And get ready to start the demo again as soon as the music re-starts
		    			schedule[currentPos+1].trackPos, 
		    			schedule[currentPos+1].patternPos, 
		    			doNextPart
		        	);
        	}
        }
        
        // This is call when the music breakpoint (Set the by the scheduler above) is reached.
        function doNextPart() {
			currentPos++;								// Move schedule pointer onto next part of the schedule
			currentPart = schedule[currentPos].layers;	// Set the current demo layers from the schedule
			if (currentPos == schedule.length) 			// If we're at the end of the schedule, reset pointer
				currentPos = 0;
			scheduleNextPart();							// Schedule the next demo part
        	if (!loopOn) requestAnimFrame( demo_loop );	// If the demo loop was turned off, start it again.
        }
        
        // This checks if the demo loop is to continue, by checking the demo layers from the schedule.
        // In some parts of the schedule, we turn it off (eg for the "freeze-frame" bits.)
        //
        // LAYER OPTIONS:
        //		loop: true/false (default is true)
        function checkContinue() {
    		loopOn = defaultTrue( currentPart.loop );
        	if ( loopOn ) requestAnimFrame( demo_loop );
        }

        // Reset any content that needs to be reset. (Mainly the scroller)
        function resetContent() {
        	scrollLine.scroffset = 0;
        	scrollOffScreen.clear();
        	scrollScreen.clear();
        	currentScrollBackPos = 10;
        }

        // DEMO LAYERS ===========================================================================================
        
        // MAIN SCREEN
        //
        // Basically clears the main screen canvas. Exciting, huh!
        //
        // LAYER OPTIONS:
        //		main: true/false (default is true)
        function draw_mainScreen() {
        	if ( defaultTrue( currentPart.main ) )		// If we're showing the main screen
    		{
	    		mainScreen.clear();  					// ... clear it.
	    		mainScreen.show();
    		}   
        	else
        		mainScreen.hide();						// Otherwise, hide it.
        }
        
        // "SENIOR DADS PRESENT" SCREEN
        //
        // Show or hide "Presents" screen.
        //
        // LAYER OPTIONS:
        //		presents: true/false (default is false)
        function draw_presentsScreen() {
        	if ( defaultFalse( currentPart.presents ) ) 	
        		presentsScreen.show();
        	else 
        		presentsScreen.hide();
        }
        
        // WIBBLY BACKDROP
        //
        // LAYER OPTIONS:
        //		backdrop: { 
        //			name: "[name of image in backdrop hash array]" , 
        //			animate :true/false (default is false),				<- Whether to fling in the image from the bottom of the screen or not
        //			wobble :true/false (default is false)				<- Whether to do the wobble or not
        //		}
        function draw_backDrop() {
            // Main backdrop code now moved outside, as it's also being used in the credits screen as well.
        	var backDropChanges = backDrop( currentPart.backdrop, backDropY, backdropCleared );
        	backDropY = backDropChanges.backDropY;
        	backdropCleared = backDropChanges.backdropCleared;
        }
        
        // "BURPY" COPPERS
        //
        // LAYER OPTIONS:
        //		coppers: true/false (default is false)
        function draw_coppers() {
        	if ( defaultFalse( currentPart.coppers ) ) {
            	// We're copying the copper source, from the current source y-pos, 20 times down the screen. 
            	// As we go down the screen, we're also increasing the y-pos, so as to give a "Venetian blind" effect!
            	var copperStart=0;												// Venetian blind index!
            	for( var copperCopy = 0; copperCopy < 20; copperCopy++ ) {	
            		copperStart++;												// Start opening the Venetian blinds!!
            		if ( copperStart > 10 ) copperStart++;						// From half way down, open the Venetian blinds a bit more!
            		// Copy from the copper source, and stretch across the width of the screen.
            		copperSource.drawPart( copperScreen, 0, copperCopy * 20, 0, copperStart + copperY, 1 , 20, 1, 0, 640, 1 );
            	}
            	copperScreen.show();
	        	copperY++;				// Move onto next base position for the next frame
	        	if (copperY > 400)		// If we're at the end
	        		copperY = 0;		// ... Reset the y-pos of the copper source
        	}
        	else {
        		copperY = 0;
            	copperScreen.hide();
        	}
        }

        
        // BEER RASTERS
        //
        // LAYER OPTIONS:
        //		backGrad: { 
        //			top :true/false (default is false),				<- Show top half of beer rasters
        //			bottom :true/false (default is false)			<- Show bottom half of beer rasters
        //		}
        function draw_backGradient() {
			backGradientTopScreen.hide();									// Hide both halves by default
			backGradientBottomScreen.hide();
        	if ( defaultFalse( currentPart.backGrad ) ) {					// However, if they're specified in the schedule.
        		// ... Show the canvases according to whether top and/or bottom is specified. (Easy, huh!)
    			if ( defaultFalse( currentPart.backGrad.top ) ) backGradientTopScreen.show();				
    			if ( defaultFalse( currentPart.backGrad.bottom ) ) backGradientBottomScreen.show();
        	}
        }
        
        // 2D STARFIELD
        //
        // LAYER OPTIONS:
        //		starfield: true/false (default is false)
        function draw_starfield() {
        	if ( defaultFalse( currentPart.starfield ) ) SDStarfield.draw();	// That was easy!
        }
        
        // 'DEF DEMO TITLE
        //
        // LAYER OPTIONS:
        //		title: { 
        //			def :true/false (default is false),			<- Show "'Def" title
        //			demo :true/false (default is false)			<- Show "'Demo" title
        //		}
        function draw_title() {
        	titleDefScreen.hide();									// Hide both title by default
        	titleDemoScreen.hide();
        	if ( defaultFalse( currentPart.title ) ) {				// Similar to the Beer Rasters- if we have something in the schedule...
        		// ... Show the canvases according to whether "def" and/or "demo" is specified.
        		if ( currentPart.title.def ) titleDefScreen.show();
	    		if ( currentPart.title.demo ) titleDemoScreen.show();
        	}
        }
        
        // DISTY DAD
        //
        // Well, it *can* be disty, if you want.
        //
        // LAYER OPTIONS:
        //		disty: true 									<- Show disty Dad *without* the dist!
        //		disty: { 
        //			animate :true/false (default is false)		<- Turn dist on or off
        //		}
        function draw_distyDad() {
        	if ( defaultFalse( currentPart.disty ) )			// If we've turned the Dads on...
        		if ( currentPart.disty.animate )									// If we're animating...
        			SDDistyDadFX.sinx( 320 - (SDDistyDad.img.width / 2), 20);			// Draw the disty version
        		else
        			SDDistyDad.draw(mainScreen, 320 - (SDDistyDad.img.width / 2), 20);	// Otherwise, draw the static version
        }
        
        // WOBBLY LOGO
        //
        // LAYER OPTIONS:
        //		logo: true 										<- Show static logo at top of screen
        //		logo: { 
        //			animate :true/false (default is false),				<- Whether to bounce logo up and down or not
        //			wobble :true/false (default is false)				<- Whether to do the wobble or not
        //		}
        function draw_logo() {
        	if ( defaultFalse( currentPart.logo ) )				// If we're doing the logo...
    		{
        		var logoX = 320 - (SDLogo.img.width /2);			// Logo is in centre of screen
        		if ( currentPart.logo.animate ) {					// If it's bouncing...
        			logoY = 280 - Math.abs(Math.sin(logoPos) * 260);	// ... Get latest position of bounce
        			logoPos += 0.025;									// ... Set next position of bounce
        		}
        		else {												// If it's static...
        	    	logoY = 20;											// ... Put at top of screen
        	    	logoPos = 1.8;										// ... and reset the bounce position
        		}
        		if ( currentPart.logo.wobble )						// If it's wobbling...
        		{
        			logoX += SDLogoWobbler.h();							// ... Add the wobble differentials to the X,Y Coords
        			logoY += SDLogoWobbler.v();
        		}
        		SDLogoScreen.draw(mainScreen,logoX,logoY);			// Now draw the logo on the screen at the coordinates calculated.
    		}
        	else 
        		SDLogoScreen.hide();							// If we're not doing the logo, just hide it.
        }
        
        // 3D DISKFIELD
        //
        // This is unusual in that there's hardly any CODEF in it! We're calculating the 3D ourselves. 
        // This function is partially based on a 3D spritefield routine by Mellow Man.
        //
        // LAYER OPTIONS:
        //		diskfield: true/false (default is false)
        function draw_diskField() {
        	if ( defaultFalse( currentPart.diskfield ) ) {
        	    var halfWidth  = 640 / 2;						// Vanishing point in the centre of the screen
        	    var halfHeight = 480 / 2;
        	    var length = diskFieldCoordinates.length;
        	 
        	    for( var i = 0; i < length; i++ ) {
        	    	diskFieldCoordinates[i].z -= 0.2;					// Move each disk a little towards the viewer
        	 
    	        	if( diskFieldCoordinates[i].z <= 0 ) {				// If it's past the viewer, generate a new random coordinate at the back
    	        		diskFieldCoordinates[i].x = random(-25,25);
    	        		diskFieldCoordinates[i].y = random(-25,25);
    	        		diskFieldCoordinates[i].z = maxDiskfieldDepth;
    	        	}
    	 
    	        	// Now convert the 3D coords to 2D
    	        	var k = 128 / diskFieldCoordinates[i].z;				// Scale for 3D x,y coords accoring to z coordinate
    	        	var x = diskFieldCoordinates[i].x * k + halfWidth;		// Scale 3D x-coord in relation to vanishing point to make Make 2D x-coord 
    	        	var y = diskFieldCoordinates[i].y * k + halfHeight;		// Scale 3D y-coord in relation to vanishing point to make Make 2D y-coord 
    	 
    	        	// If the coordinate are within the bounds of the screen, we can draw the disk
    	        	if( x >= 0 && x <= 640 && y >= 0 && y <= 480 ) {						
    	          		var size = ((1 - diskFieldCoordinates[i].z / 32.0)*5)/8;					// Work out the image scale according to the z-coord.
    	          		var shade = (parseInt((1 - diskFieldCoordinates[i].z / 32.0)*255))/255;		// Work out the image shade according to the z-coord.
    	          		diskbobScreen.draw( mainScreen, x, y, shade, 0, size, size );				// Now we can put the scaled shaded image on the screen
    	        	}
        	    }
        	}
        }
        
        // VECTOR DISKS
        //
        // LAYER OPTIONS:
        //		vectaDisk: true/false (default is false)				<- "Standard" vectordisks
        //		vectaDisk: { 
        //			wibble :true/false (default is false)				<- "Agitated" vectordisks
        //		}
        function draw_vectorDisks() {
        	if ( defaultFalse( currentPart.vectaDisk ) ) {			// If vector disks are on...
        		if ( defaultFalse( currentPart.vectaDisk.wibble ) ) {	// If they're "agitated"...
        			// Do tweening to "base" position if needed
        			vectorDiskSRotX = tweenTo( vectorDiskSRotX );			
        			vectorDiskSRotY = tweenTo( vectorDiskSRotY );
        			vectorDiskSRotZ = tweenTo( vectorDiskSRotZ );
        			vectorDiskDRotX = tweenTo( vectorDiskDRotX );
        			vectorDiskDRotY = tweenTo( vectorDiskDRotY );
        			vectorDiskDRotZ = tweenTo( vectorDiskDRotZ );
        			// Now apply "agitated" "wibble" to their rotation!
	        		vectorDiskS.group.rotation.x = vectorDiskSRotX + vectorDiskSWibble.h();;
	        		vectorDiskS.group.rotation.y = vectorDiskSRotY + vectorDiskSWibble.v();;
	        		vectorDiskS.group.rotation.z = vectorDiskSRotZ + vectorDiskSWibble.z();;
	        		vectorDiskD.group.rotation.x = vectorDiskDRotX + vectorDiskDWibble.h();;
	        		vectorDiskD.group.rotation.y = vectorDiskDRotY + vectorDiskDWibble.v();;
	        		vectorDiskD.group.rotation.z = vectorDiskDRotZ + vectorDiskDWibble.z();;
        		}
        		else {					// If they're not "agitated", just apply normal uniform rotation to them
	        		vectorDiskS.group.rotation.x+=0.01;	
	        		vectorDiskS.group.rotation.y+=0.02;
	        		vectorDiskS.group.rotation.z+=0.04;
	        		vectorDiskD.group.rotation.x-=0.01;				// The D rotates in the opposite direction to the S
	        		vectorDiskD.group.rotation.y-=0.02;
	        		vectorDiskD.group.rotation.z-=0.04;
	            	vectorDiskSRotX = vectorDiskS.group.rotation.x;	// Save the rotation (Sor when the "tween" is used.)
	            	vectorDiskSRotY = vectorDiskS.group.rotation.y;
	            	vectorDiskSRotZ = vectorDiskS.group.rotation.z;
	            	vectorDiskDRotX = vectorDiskD.group.rotation.x;
	            	vectorDiskDRotY = vectorDiskD.group.rotation.y;
	            	vectorDiskDRotZ = vectorDiskD.group.rotation.z;
	        	}
        		// Now, wobble their x,y coordinates
        		vectorDiskS.group.position.x = vectorDiskSX + vectorDiskSWobble.h();
        		vectorDiskS.group.position.y = vectorDiskSY + vectorDiskSWobble.v();
        		vectorDiskS.draw();
        		vectorDiskD.group.position.x = vectorDiskDX + vectorDiskDWobble.h();
        		vectorDiskD.group.position.y = vectorDiskDY + vectorDiskDWobble.v();
        		vectorDiskD.draw();
        	}
        	
        	// "Tween" for vector disks. This used when going into "agitated" mode, so 
        	// that the vector objects drift back to their "base" position (ie unrotated) 
        	// whilst wibbling!
        	function tweenTo( value ) {
        		var speed =  0.04;
        		if ( value < 0 )
        			value += speed;
        		if ( value > 0 )
        			value -= speed;
        		return value;
        	}
        	
        }
        
        // COLOUR BARS
        //
        // LAYER OPTIONS:
        //		colourBar: { 
        //			top :true/false (default is false),					<- Top colour bar on/off
        //			bottom :true/false (default is false)				<- Bottom colour bar on/off
        //		}
        function draw_colourBar() {
        	if ( defaultFalse( currentPart.colourBar ) ) {
	        	if ( currentPart.colourBar.top ) {					// If we're drawing the top bar
	        		colourBar.draw(mainScreen, colourbarXTop, 11);		// Copy it from it's current source position
	        		colourbarXTop += colourBarSpeed;					// ... and move it along a bit.
	        		if (colourbarXTop>=0) 								// If it's at the wrap point...
	        			colourbarXTop=-640;								// ... reset it
	        	}
	        	if ( currentPart.colourBar.bottom ) {				// If we're drawing the bottom bar
	        		colourBar.draw(mainScreen, colourbarXBottom, 391);	// Copy it from it's current source position
	        		colourbarXBottom-=colourBarSpeed;					// ... and move it along a bit. (Opposite direction to top bar)
	        		if (colourbarXBottom<=-640)							// If it's at the wrap point...
	        			colourbarXBottom=0;								// ... reset it
	        	}
        	}
        }
        
        // COPPER PIPES
        //
        // LAYER OPTIONS:
        //		rasterBar: true/false (default is false)
        function draw_rasterBar() {
        	if ( defaultFalse( currentPart.rasterBar ) ) {			// If we're showing the copper pipes...
        		rasterBar1Screen.show();
        		rasterBar2Screen.show();
        		rasterBar3Screen.show();
        		rasterBar1Y = 330 - Math.abs(Math.sin(rasterBar1Pos) * 200);	// Calculate their y-pos in the sinewave
        		rasterBar2Y = 330 - Math.abs(Math.sin(rasterBar2Pos) * 200);
        		rasterBar3Y = 330 - Math.abs(Math.sin(rasterBar3Pos) * 200);
        		if ( currentPart.rasterBar.wobble ) {							// If we're wobbling....
        			rasterBar1Y += rasterWobbler1.h();							// ... Add in the wobble
        			rasterBar2Y += rasterWobbler2.h();
        			rasterBar3Y += rasterWobbler3.h();
        		}
        		rasterBar1Pos += rasterBarSpeed;						// Move sinewave along a bit for next frame
        		rasterBar2Pos += rasterBarSpeed;
        		rasterBar3Pos += rasterBarSpeed;
        		rasterBar1Screen.y = rasterBar1Y;						// Now position the pipes!
        		rasterBar2Screen.y = rasterBar2Y;
        		rasterBar3Screen.y = rasterBar3Y;
    		}
        	else  {
        		rasterBar1Screen.hide();
        		rasterBar2Screen.hide();
        		rasterBar3Screen.hide();
        	}
        }
        
        // BIG SPRITES
        //
        // Pretty easy this- just get the x,y coords from each sprite's wave/wobble, and plot them.
        //
        // LAYER OPTIONS:
        //		sprites: true/false (default is false)
        //		sprites: {
        //			bob: [Codef image of spriter bob you want to use]
        //		}
        function draw_sprites() {
        	if ( defaultFalse( currentPart.sprites ) ) {			// If we're drawing the sprites...
        		if ( defaultFalse( currentPart.sprites.bob ) ) 			// If we're changing the sprite bob
        			if (currentBob != currentPart.sprites.bob )			// ... Check that it's different
        				currentBob = currentPart.sprites.bob;			// ... Then change it
        		for (var i=0; i < noOfSprites; i++) {
        			var x  = spriteWobblers[i].h() + ( ( 640 - currentBob.img.width ) / 2); 	// Work out position of wave/wobble in relation to the centre of the screen and bob
        			var y  = spriteWobblers[i].v() + ( ( 400 - currentBob.img.height ) / 2); 
        			currentBob.draw(mainScreen, x, y);											// Now draw it.
        		}
        	}
        }
        
        // DADCUBE
        //
        // LAYER OPTIONS:
        //		cube: true/false (default is false)					<- Standard flying around and wobbling
        //		cube: {
        //			hold: true/false (default is false)				<- Hold and wobble
        //		}
        //		cube: {
        //			hold: {
        //				rot: true/false (default is false),			<- Hold and madman rotation!
        //				bye: true/false (default is false)			<- Madman rotation tumbling away!
        //			}
        //		}
        function draw_dadCube() {
        	if ( defaultFalse( currentPart.cube ) ) {			// If we're doing the cube
        		if ( defaultFalse( currentPart.cube.hold ) ) {		// If we're doing the hold...
        			if (dadCubeX == 0) {								// If this is the start of the hold...
        				dadCubeX = dadCube3D.group.position.x;				// ... Save the x,y coords 
        				dadCubeY = dadCube3D.group.position.y;
        				dadCubeRotX = dadCube3D.group.rotation.x;			// ... and the rotation
        				dadCubeRotY = dadCube3D.group.rotation.y;
        				dadCubeRotZ = dadCube3D.group.rotation.z;
        			}
        			if ( currentPart.cube.hold.rot ) {						// If it's the mad rotation...
        				dadCube3D.group.rotation.x = dadCubeRotX + dadCubeHoldRotWobble.h();	// ... set the rotation via the wobbler
        				dadCube3D.group.rotation.y = dadCubeRotY + dadCubeHoldRotWobble.v();
        				dadCube3D.group.rotation.z = dadCubeRotZ + dadCubeHoldRotWobble.z();
        			}
        			if ( currentPart.cube.hold.bye ) {						// If it's going away...
        				dadCube3D.group.position.x -= 10 + dadCubeHoldWobble.h();		// ... Have it sailing away towards the bottom right
        				dadCube3D.group.position.y -= 10 + dadCubeHoldWobble.v();
        				dadCube3D.group.position.z -= 20;
        			}
        			else {													// Otherwise the standard hold is just to wobble the x,y coords
                		dadCube3D.group.position.x = dadCubeX + dadCubeHoldWobble.h();
                		dadCube3D.group.position.y = dadCubeY + dadCubeHoldWobble.v();
        			}
        		}
        		else {									// For normal flying around...
            		dadCube3D.group.rotation.x+=0.01;		// ... Normal uniform rotation
            		dadCube3D.group.rotation.y+=0.02;
            		dadCube3D.group.rotation.z+=0.04;
	        		dadCube3D.group.position.x = dadCubeMainWobble.h();      // Get next position in wave/wobble of cube  		
	        		dadCube3D.group.position.y = dadCubeMainWobble.v();        		
	        		dadCube3D.group.position.z = dadCubeMainWobble.z();        		
	            	dadCubeX = 0;
	            	dadCubeY = 0;
        		}
        		// Now that all the rotation and position has been set, we can draw the cube!
        		dadCube3D.draw();
        	}
        }
        
        // CHROMAKEY DISTYSCROLL
        //
        // This projects a background through a disty scroller. You can change the backgrounds, and it'll scroll
        // through all the backgrounds till it gets to the right one. The background also wobbles.
        //
        // This is definately the slowest part of the main demo, given that it does:
        // a) a scroller
        // b) dist on the scroller
        // c) a composite copy of the background on top of the dist
        // d) after all that, *then* it draws to the screen!
        // So there's probably a way to do it quicker!
        //
        // LAYER OPTIONS:
        //		scroller: true/false (default is false)							<- Run scroller with current background
        //		scroller: {
        //			back: [Number of background from background list (1-7)]		<- Move to next background
        //		}
        function draw_scroller() {
        	if ( defaultFalse( currentPart.scroller ) ) {
	        	scrollOffScreen.clear();
	        	scrollScreen.clear();
	        	scrollLine.draw(0);
	        	scrollFx.siny(0,55);
	        	scrollScreen.contex.globalCompositeOperation='source-atop';
	        	scrollBackScreen.drawPart(scrollScreen,0,0,0,currentScrollBackPos+scrollBackWobbler.h(),640,scrollBackSegmentHeight);
	        	scrollScreen.draw(mainScreen,0,260);
	        	scrollScreen.contex.globalCompositeOperation='source-over';
	        	if (defaultFalse( currentPart.scroller.back )) 
	        		nextScrollBackPos = ( ( currentPart.scroller.back - 1 ) * scrollBackSegmentHeight) + 10;
	        	if (currentScrollBackPos != nextScrollBackPos) {
	        		if (currentScrollBackPos < nextScrollBackPos)
	        			currentScrollBackPos += 5;
	        		if (currentScrollBackPos > nextScrollBackPos)
	        			currentScrollBackPos -= 5;
	        	}
        	}
        }
    	
        // The "ANY KEY" BUTTON
        //
        // This simply slowly fades on the button. (Which was always there, but was invisible.)
    	function display_spacebar() {
    		if (currentPart.spacebar)					// If we've got the OK to show the button...
	    		if (spacebarOpactity<1) {				// ... (Stop doing the fade, if the button is completely visible- opacity = 1)
	            	spacebarOpactity += 0.025;			// ... Increase the opacity value a little each frame
	            	nextButton.style.opacity = spacebarOpactity;	// ... and use to to fade up the button
	    		}
    	}
    	
    	// END OF DEMO LAYERS ==========================================================================================
    }

    // END OF MAIN DEMO ================================================================================================
    function mainDemoAbort() {
    	currentPos = 0; 										// Reset demo schedule (For when it restarts)
    	currentPart.loop = false;								// Switch off demo animation loop
    	nextButton.style.opacity = "0"; 						// Hide "any key" button
    	nextButton.style.cursor = "default"; 
        nextButton.removeEventListener('mousedown', spaceBar);	// Remove any events associated with "Any key" button.
        nextButton.removeEventListener('touchend', spaceBar);
    	music_Sashy.stop();										// Stop the main music
    	defDemo.next();											// Go to the next part (Credits screen).
    }

    // CREDITS SCREEN ==================================================================================================
    //
    // Plays "Rasero Team Fuck Out" music, and displays wobbly credits, like an old TV programme!
    function credits() {
    	if (DEBUG) document.getElementById('scheduleInfo').innerHTML = "<br/><br/>Now playing the credits section. ";	// If we're dubugging, display that we're running credits screen

    	// INITALISE CREDITS VARIABLES
    	init_credits();									// Set up credits scroller panel
    	var creditsLoopOn = true;						// If we're running the scredits screen
    	var endScreenTimer = 2500;						// How long the credits screen runs
    	// Now to set up the backdrop
    	var backDropY = 405;							// Backdrop starts by flying up onto the screen			
    	var backdropCleared = true;						// Clear backdrop in readiness for the screen to fly up.
    	var backdropInfo = { name: "feat_back", animate: true, wobble: true };		// Set the backdrop information.
    	// As we can get to the credits screen at any point in the main demo, there might be some layers
    	// from that part which are visible, so we'll fade those layers just as this screen is starting.
    	var fadescreens = [ mainScreen, 				// Array of layers to fade
    	                    rasterBar1Screen, 
    	                    rasterBar2Screen, 
    	                    rasterBar3Screen, 
    	                    backGradientTopScreen, 
    	                    backGradientBottomScreen, 
    	                    titleDefScreen, 
    	                    titleDemoScreen, 
    	                    SDLogoScreen
    	                  ];
    	var opacity = 1;								// Starting opacity of the layers (ie visible)
    	var fadeFinished = false;						// If the fade has finished.
    	// Now the variables for the credits scroller. This is a long panel containing the credits (See the init_credits function.)
    	var scrollEndpoint = creditsScreenText.canvas.height - 400;		// Where to finish scrolling the credits panel
    	var currentScrollPos = -400;									// Current y-pos of the credits panel in relation to the screen.
    	copperScreen.show();				// Show the "burpy" coppers layer. This layer is used by credits scroller. (See function draw_scroller below.)

    	window.onkeypress = end;			// Press any key to go to the end of this part, and then onto the "end crash".
    	music_rasero.play();				// Start playing "Rasero Team Fuck Out".
    	credits_loop();						// Now start the credits loop!

    	// CREDITS LOOP =====================================================================================================
    	function credits_loop() {
    		do_fade();
    		draw_backDrop();
    		draw_scroller();							
    		endScreenTimer--;								// Countdown the timer.
    		if (endScreenTimer==0) end();								// If it gets to zero, end the credits!
    		else if (creditsLoopOn) requestAnimFrame( credits_loop );	// ... otherwise if the demo is continuing, go to the next frame.
    	}
    	
    	// FADING MAIN DEMO LAYERS
    	function do_fade() {
    		if (!fadeFinished)								// If we're still fading...
	    		var noOfScreens = fadescreens.length;			// ... get the number of layers we're fading.
	    		if (opacity > 0) {								// If they're sill visible...
	    			opacity -= 0.025;							// ... fade the opacity a little bit for this frame ...
	    			for ( var i = 0; i < noOfScreens; i++ )		// ... and apply this to all the layers we need to fade
	    				fadescreens[i].canvas.style.opacity = opacity;
	    		}
	    		else {											// If they're not visible ...
	    			for ( var i = 0; i < noOfScreens; i++ )		// ... hide all the layers ...
	    				fadescreens[i].hide();
	    			fadeFinished = true;						// ... and stop the fade.
	    		}
    	}
    	
    	// CREDITS SCROLLER
    	//
    	// Draw a part of the credits panel onto the "burpy" coppers layer. The y-pos of the credits panel source is
    	// increased until it reaches the end of the panel, and then just stops. A wobble is also applied to the credits
    	// panel x,y position.
    	//
    	// The reason we're re-using the "burpy" coppers layer for displaying the credits is that it's the lowest layer 
    	// in the layer stack above the backdrop layer. (And it also allows us to do the fade on the other layers above it.)
    	function draw_scroller() {
    		copperScreen.clear();				
    		// Draw from the credits panel, using the scroll position, and with a wobble applied to it.
    		creditsScreenText.drawPart(copperScreen, 0, 0, creditsWobbler.h(), currentScrollPos + creditsWobbler.v(), 640, 400 );
    		// If we're not at the end of the panel, increase the scroll position.
    		// If we're at the end, it'll just stop.
    		if (currentScrollPos < scrollEndpoint) currentScrollPos += 1;
    	}
    	
    	// BACKDROP
    	//
    	// This just calls the generic backdrop code to fling up the backdrop and wobble it about.
        function draw_backDrop() {
        	var backDropChanges = backDrop( backdropInfo, backDropY, backdropCleared );
        	backDropY = backDropChanges.backDropY;
        	backdropCleared = backDropChanges.backdropCleared;
        }
        
    	// INITALISE CREDITS PANEL
        //
        // This creates a long image panel on which it pre-draws the credits, and adds the Dad logo at the end.
        // The scroller then copies a window from this panel onto the screen, and slowly moves down the window
        // until it gets to the end. Probably a bit wasteful on memory, but it's quick, and makes the scroller 
        // logic much easier.
    	function init_credits() {
    		// Now the credits text. This is an array of individual lines for the credits. 
    		// The font is 16 x 16 pixels, and the text display is 40 chars wide.
    		var creditsTexts = [
    		  //"0123456789012345678901234567890123456789",		<- Guideline!
    			"YOU HAVE BEEN WATCHING A PRODUCTION BY..", 
    			"",
    			"    THE MEGAMIGHTY FLIPPIN' BEST..... ",
    			"",
    			"        *** SENI0R = DADS ***!!!!! ",
    			"",
    			" With a new demo in CODEF called...",
    			"",
    			"=========== The 'DEF DEMO!! ============",
    			"",
    			"A new standard in web browser based HTML",
    			"5 Javascript based demo programming!!!  ",
    			"",
    			"CREDITS!! (In order of appearance) =====",
    			"",
    			"Even the mighty CODEF wasnt quite wot we",
    			"needed, so OLD FART and DODDERING GIT",
    			"wrote a highly advanced demo system to ",
    			"make this monumental demo possible!!!",
    			"",
    			"We have named this highly advanced demo ",
    			"system 'THE SENIOR DADS ADVANCED DEMO",
    			"SYSTEM'.",
    			"",
    			"========================================",
    			"",
    			"      'Senior Dads Present' screen, ",
    			"       and demo art direction by... ",
    			"",
    			"           JACKSON POLLOCK!!!!",
    			"",
    			"========================================",
    			"",
    			"     EXCLUSIVE Disk Jockey Mix by...",
    			"",
    			"           DAME VERA LYNN!!!!! ",
    			"",
    			"This mix was inspired by top DJ Sasha!!!",
    			"",
    			"The name of the tune is 'Sashy Shit'.",
    			"",
    			"INTRO!! ================================",
    			"",
    			" Logo bouncer: OLD FART!!!!!!!!!!!!!!!!",
    			"",
    			" Chromakey distyscroll: DODDERING GIT!!",
    			"",
    			"TITLES!!! ==============================",
    			"",
    			"   Titles and Disty Dad: OLD FART!!!!!!",
    			"",
    			"   Stars and Rasters: DODDERING GIT!!!!",
    			"",
    			"   'Def Demo Logo:    JACKSON POLLOCK!!",
    			"",
    			"COPPER PIPES!! =========================",
    			"",
    			"      Moving background: OLD FART!!",
    			"",
    			"      Copper Pipes: DODDERING GIT!!",
    			"",
    			"DRUNKEN DAD!! ==========================",
    			"",
    			"      Disk Field: OLD FART!!!!!!!!!",
    			"",
    			"      Beer rasters: DODDERING GIT!!",
    			"",
    			"We were going to call it 'Piss Dad', but",
    			"we were told it might offend Americans!!",
    			"",
    			"PHASE 4 STEREO!! =======================",
    			"",
    			"    Phase 4 bobs: OLD FART!!!!!!!!!",
    			"",
    			"    Phase 4 stereo: DODDERING GIT!!",
    			"",
    			"This demo is in PHASE 4 STEREO!!!!!!!!!!",
    			"",
    			"WE 'TRUMP' in 3D!! =====================",
    			"",
    			"            Tri Dad-Mapping: ",
    			"",
    			"            OLD FART!!! AND",
    			"            DODDERING GIT!!",
    			"",
    			"BTW We don't realy support Donald Trump-",
    			"We're actually taking the piddle!!!!!!!!",
    			"",
    			"TRIDI DISKBOBS!! ======================",
    			"",
    			"   Diskbobs: OLD FART!!!!!!!!!!!!!!!!",
    			"",
    			"   Burpy Copper Bars: DODDERING GIT!!",
    			"",
    			"",
    			"CREDITS (HERE) !! =====================",
    			"",
    			"     Music: 'Rasero Team Fuck Out' ",
    			"     by DAME VERA LYNN!!!!!!!!!!!! ",
    			"",
    			"    Parallax background: OLD FART!!!",
    			"",
    			"    Scroller: DODDERING GIT!!!!!!!!!",
    			"",
    			"=======================================",
    			"",
    			"Tweet us!!! @seniordads!!!!!  ",
    			"",
    			"Surf us!!!  seniordads.atari.org",
    			"",
    			"Meet us!!!  Visit West Milton!!!!",
    			"",
    			"=======================================",
    			"",
    			"        (c) SENIOR DADS IN THE ",
    			"       YEAR OF OUR LORD 2015!!!",
    			"",
    			"",
    			"" ];
    		var lineCount = creditsTexts.length;		// We'll need the number of lines in the credits text in order to calulate various things
    		var textHeight =  (16 * lineCount);			// ... For example how high in pixel terms the credits are!
    		creditsScreenText = new canvas(640, textHeight + 400);	// Create the image panel (Add in a screens worth of space for the Dads logo at the end.)

    		// Now to draw the credits onto the panel. We'll be using the same font we used in the scroller, so we'll
    		// be using the CODEF Tile draw function to achieve this. However, we'll also be using the scale option
    		// in the draw function to draw the 32x16 font elements as 16x16.
    		var x;
    		var y = 0;
    		for (var i = 0; i < lineCount; i++ ) {		// For each line in the credits ...
    			var currentLine = creditsTexts[i];			// Get the text
    			var linelength = currentLine.length;		// Get how long it is
				x = 0;										// Start drawing on the left of the panel at this line
    			if ( linelength > 0 ) {						// Don't bother if the line's blank.
    				for (var j = 0; j < linelength; j++ ) {						// For each character in the line ...
    					var tileNo = currentLine.charCodeAt(j) - " ".charCodeAt(0);	// Get the font tile number from the ASCII code
    					if (tileNo>0)												// Unless it's the space character ...
    						SDFont.drawTile(creditsScreenText,tileNo,x,y,1,0,0.5,1);	// ... Draw the font tile, scaled from 32x16 down to 16x16
        				x += 16;													// Move onto next character position in panel
    				}
    			}
    			y += 16;									// Move onto next line position in panel
    		}
    		// Now draw the Dads logo in the centre of the space after the credits.
    		SDDistyDad.draw( creditsScreenText, 320 - (SDDistyDad.img.width/2), textHeight + (200 - (SDDistyDad.img.height/2)));
    		// The credits have been drawn in opaque white from the source font. 
    		// Now we'll colour them in a slightly translucent yellow.
    		creditsScreenText.contex.globalCompositeOperation='source-atop';		// Next operation only affects the already drawn elements
    		creditsScreenText.quad(0,0,640,textHeight, "rgba(255,255,128,0.80");	// Colour everything apart from the Dads logo.
    		// Finally, the wobbler for the credits panel.
    		creditsWobbler = new SeniorDads.Wobbler(
    				[
    				 	{value: 0, amp: 1, inc:0.30},
    				 	{value: 0.5, amp: 2, inc:0.40}
    				],
    				[
	 				 	{value: 0.5, amp: 3, inc:0.20},
	 				 	{value: 0, amp: 2, inc:0.10}
	 				]);
    	}

    	// END OF DEMO LOOP
    	//
    	// Easy one here, just stop the demo animation loop, (in case it fires again) and go to the Credits screen end
    	function end() {
        	creditsLoopOn = false;
        	creditsAbort();
        }
    }
    
    // END OF CREDITS =============================================================================================
    function creditsAbort() {
    	music_rasero.stop();					// Stop music
    	defDemo.next();							// Go to next part (End "crash")
    }

    // END "CRASH" =================================================================================================
    //
    // Displays old-skool Atari Bombs, plays a "crash" sample. 
    function endCrash() {
    	if (DEBUG) document.getElementById('scheduleInfo').innerHTML = "<br/><br/>Now playing the end crash. ";		// More debug info!!!
    	requestAnimFrame( bomb );				// Start the end "crash" on the next frame. (So as not to clash with the credits frame if it's still to finish.)

    	// CRASH!!!!!
    	function bomb() {
    		// Create the end crash sample from a dump of about 1MB of Atari Falcon 030 low memory!!
            sampleWave = new RIFFWAVE();
            sampleWave.header.numChannels = 2;			// Sample is stereo
            sampleWave.header.bitsPerSample = 8;		// ... 8 bit
            sampleWave.header.sampleRate = 25*1024;		// ... 25KHz
            // Copy the binary dump into an array of sample data for the sample player
            var sampleLength = 65536*8;
            var sampleDataSrc = new Uint8Array(endSample, 0, sampleLength);
            var sampleData = new Array();
            for (var i = 0; i<sampleLength; i++)
            	sampleData[i] = sampleDataSrc[i];
            // Now make the sample player from the sample data, and hook it up to the HTML5 AUdio.
            sampleWave.Make(sampleData);
            samplePlayer = new Audio(sampleWave.dataURI);
            // Now play the "crash" sample.
            samplePlayer.play();
            // Now to plot Atari TOS bombs on the screen!
	    	var bomber = new SeniorDads.Bomb();
			bomber.bombCanvas(copperScreen, 14);		// 14 bombs = "Format error". (Obvious joke)
	        demoWindow.WaitVbl(100, end);				// Wait a bit before ending
    	}

    	// END OF "CRASH"
        function end() {
            demoWindow.FlushWaitVbl();
        	samplePlayer.pause();						// Stop the sample
        	defDemo.next();								// Go to the end of the demo.
        }
    }

    // END OF DEMO ===================================================================================================
    function endDemo() {
    	copperScreen.fill("#ffffff");																		// Whiteout!
    	if (DEBUG) document.getElementById('scheduleInfo').innerHTML = "<br/><br/>END OF DEMO. ";			// Guess what?
    }
    
    // GENERIC ROUTINES ==============================================================================================

    // Make random number within a min, max range.
	function random(min,max){ return Math.floor( Math.random() * (max - min - 1) ) + min; }
    
	// If an optional value doesn't exist, return a default value
    function optionalDefault( value, defaultValue ) {
    	if ( value === undefined ) return defaultValue;
    	else if ( value == null ) return defaultValue;
    	else return value;
    }
        
    // If an optional value doesn't exist, return true
    function defaultTrue( value ) { return optionalDefault( value, true ); }

    // If an optional value doesn't exist, return false
    function defaultFalse( value ) { return optionalDefault( value, false ); }
    
    // (WOBBLY) BACKDROP
    //
    // Copy an image to the backdrop screen, and (optionally) wobble it about.
    //
    // This was originally part of the main demo section, and hence with it's scope,
    // like the other layers. However as we wanted to use in the Credits screen, we 
    // put it in the general demo scope, so the Credits section could acccss it.
    //
    // Parameters:
    // 	backdropInfo    - a backdrop lement of a demo layer (see the main demo for more info about layers)
    //  backDropY       - y-pos of backdrop source image
    //  backdropCleared - whether the backdrop has been cleared
    //
    // Returns an object containg the following properties:
    //  backDropY       - y-pos of backdrop source image
    //  backdropCleared - whether the backdrop has been cleared
    function backDrop( backdropInfo, backDropY, backdropCleared ) {
    	if ( defaultFalse( backdropInfo ) ) {			// If we're showing the backdrop
    		backDropScreen.show();							// ... show it
    		if (backdropInfo.animate) 						// If We're flinging it in ...
    			if (backDropY > 5) backDropY -= 20;				// ... continue to move it in
    			else backDropY = 0;
    		else
    			backDropY = 0;									// .. Otherwise, it's at the top of the screen
    		if (backdropInfo.wobble)			// If it's wobbling, copy image to screen with wobble offset.
    			backDropImages[backdropInfo.name].drawPart(backDropScreen,backDropWobbler.h(),backDropWobbler.v() + backDropY, 1, 0, 645, 405);
    		else								// If not, just copy image to screen
    			backDropImages[backdropInfo.name].drawPart(backDropScreen,0,backDropY, 1, 0, 640, 400);
			backdropCleared = false;
    	}
    	else {									// If we're not showing the backdrop...
    		backDropScreen.hide();					// ... hide the screen
    		if (!backdropCleared) {					// ... clear it if we need to
    			backDropScreen.clear();
    			backdropCleared = true;
    		}
    		backDropY = 405;						// ... reset the y-pos
    	}
    	var backDropChanges = new Object();					// Now return back any changes made
    	backDropChanges.backDropY = backDropY;
    	backDropChanges.backdropCleared = backdropCleared;
    	return backDropChanges;
    }

    // Called whenever the "Any Key" is pressed. Goes to next part of demo.
    function spaceBar(e) { defDemo.currentPart().abort(); };
    
    // THE END ==============================================================================================================
    
}; // Bye!
