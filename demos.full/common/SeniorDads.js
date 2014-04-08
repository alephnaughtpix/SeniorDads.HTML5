// create the root namespace and making sure we're not overwriting it
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

/* Senior Dads "Bomb" */
SeniorDads.CreateNameSpace("SeniorDads.Bomb");

SeniorDads.Bomb = function () {
    // Atari TOS bomb bitmap pattern- copied from ROM listing in ST Internals!
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
    var truColBombCanvas = document.createElement('canvas');
    truColBombCanvas.id = "SeniorDads.Bomb.Store";
    truColBombCanvas.width = 16;
    truColBombCanvas.height = 16;
    truColBombCanvas.style.visibility = 'hidden';

    convertBombToTruCol();
    
    this.bombCanvas = canvasBombs;

    function convertBombToTruCol() {
        var foreground = [0, 0, 0, 0xff];
        var background = [0xff, 0xff, 0xff, 0xff];
        var context = truColBombCanvas.getContext('2d');
        var canvasData = context.createImageData(16, 16);
        var colour;
        var canvasDataPosition = 0;
        for (var i = 0; i < 16; i++) {
            var currentBombLine = bombBits[i];
            for (var j = (16 - 1); j > -1; --j) {
                colour = ((currentBombLine & (1 << j)) > 0) ? foreground : background;
                canvasData.data[canvasDataPosition++] = colour[0];
                canvasData.data[canvasDataPosition++] = colour[1];
                canvasData.data[canvasDataPosition++] = colour[2];
                canvasData.data[canvasDataPosition++] = colour[3];
            }
        }
        context.putImageData(canvasData, 0, 0);
    }
    
    function canvasBombs( screen, bombCount ) {
    	var y = (screen.height() - 16) / 2;
    	var x = 0;
    	var context = screen.context();
    	for (var i=0; i < bombCount; i++) {
    		context.drawImage(truColBombCanvas, x, y);
    		x += 16;
    	} 
    };
};

SeniorDads.CreateNameSpace("SeniorDads.Demos.Demo");

SeniorDads.Demos.Demo = function(loader, init, abort) {
	var currentDemoPart;
	var demoPartList = [];
	var currentDemoPartCounter = 0;
    
    this.load = loader;
    this.init = initialise; 
    this.abort = abortDemo;
    this.add = addDemoPart;
    this.next = nextDemoPart;
    this.start = start;
    this.loadAndStart = loadAndStart;
    
    function loadAndStart() {
    	loader( initAndStart );
    }
    
    function addDemoPart(currentDemo) {
    	demoPartList.push(currentDemo);
    }
    
    function addDemoParts(newDemoList) {
    	demoPartList = newDemoList.clone();
    }
    
    function initialise() {
    	if ( init != null)
    		init(); 
    }
    
    function initAndStart() {
    	initialise(); 
		start();
    }
    
    function start() {
    	currentDemoPartCounter = 0;
    	nextDemoPart();
    }
    
    function nextDemoPart() {
    	if (currentDemoPartCounter < demoPartList.length ) {
	    	currentDemoPart = demoPartList[currentDemoPartCounter++];
	    	currentDemoPart.start();
    	}
    	else {
    		abortDemo();
    	}
    }
    
    function abortDemo() {
    	if ( currentDemoPart != null )
    		currentDemoPart.abort();
    	if ( abort != null)
    		abort();
    }
    
    SeniorDads.Demos.Demo.DemoPart = function(init, start, abort) {
        this.init = function () { 
        	if ( init != null)
        		init(); 
        };
        this.start = function () { 
        	if ( start != null)
        		start(); 
        };
        this.abort = function () { 
        	if ( abort != null)
        		abort(); 
        };
        
        this.init();
    };
};
