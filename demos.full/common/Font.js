/**
 * @fileOverview Senior Dads font resources.
 * @author The Senior Dads
 * @version 0.4
 */

/**
 * @namespace SeniorDads.Font
 */
SeniorDads.CreateNameSpace("SeniorDads.Font");

SeniorDads.CreateNameSpace("SeniorDads.Font.Tos");
/**
 * <h1>SeniorDads.Font.Tos</h1>
 * <p><strong>{@class}</strong></p>
 * <p><em>var myFont = new SeniorDads.Font.Tos(url,graphicsMode);</em></p>
 * <p>This allows for printing text in an authentic Atari TOS font, and in "lo-res" and "med-res" modes.</p>
 * @class Atari TOS font drawing utility
 * @param {string} url URL of the font file.
 * @param {number} [graphicsMode=0] Text mode. 0 = lo-res (40 x 24), 1 = med-res (80 x 24).
 * @property {number} width Text width of screen.
 * @property {number} height Text height of screen.
 * @property {boolean} loaded Whether the resource has been loaded.
 * @property {number} resource_size Size of resource
 * @property {number} resource_loaded Resource to be loaded
 */
SeniorDads.Font.Tos = function (url, graphicsMode) {
    if (graphicsMode === undefined) graphicsMode = 0;				// Default value if not set.
    var fontData, fontBuffer, width, height, x, y, loader;
    var foreground = [0, 0, 0, 0xff];								// Standard foreground and background colours.
    var background = [0xff, 0xff, 0xff, 0xff];
    var loaded = false;												// Start off assuming we haven't loaded the font file.
    // Set up canvas for single font character
    var characterCanvas = document.createElement('canvas');
    characterCanvas.id = "SeniorDads.Font.Tos.Store";
    characterCanvas.width = 8;
    characterCanvas.height = 8;
    characterCanvas.style.visibility = 'hidden';
    var charCanvasContext = characterCanvas.getContext('2d');
    // Set text mode
    setTextMode(graphicsMode);
    // Start loading the font
    loader = new SeniorDads.Loader.Binary(url, fontData, processFont);

    Object.defineProperties(this, {
    	loaded:          { get: function() { return loaded; } },			// Whether the font file has loaded.
    	resource_size:   { get: function() { return 1; } },					// Size of the resource.
    	resource_loaded: { get: function() { return (loaded) ? 1 : 0; } },	// The amount already loaded.
    	width:           { get: function() { return width; } },				// Text width of screen.
    	height:          { get: function() { return height; } } 			// Text height of screen.
    } );

    /**
     * <p>Set graphics/text mode.</p>
     * <p>The Atari ST has the following graphics modes:
     * <ul>
     * <li>Mode 0: 16 colours, 320 x 200 pixels, 40 x 24 text</li>
     * <li>Mode 1: 4 colours, 640 x 200 pixels, 80 x 24 text</li>
     * <li>Mode 2: Monochrome, 640 x 400 pixels, 80 x 24 text</li>
     * </ul>
     * <p>So far, the text display for modes 0-1 have been emulated here. Mode 2, which 
     * requires a different font, will come in future.</p>
     * @function
     * @param {number} [setGraphicsMode=0] Text mode. 0 = lo-res (40 x 24), 1 = med-res (80 x 24).
     */
    this.SetTextMode = setTextMode;
    /**
     * Set text colours to [r,g,b,a] colours.
     * @function
     * @param {UInt8Array[4]} myForeground Foreground colour
     * @param {UInt8Array[4]} myBackground Background colour
     * @example
     *  var myFont = new SeniorDads.Font.Tos("resources/tosfont.bin");
     *  myFont.setColours(
     *  	[0xff, 0xff, 0, 0xff], 	// yellow foreground, opaque
     *  	[0, 0, 0, 0xcc]			// blue background, slightly transparent
     *  )
     *  myFont.printText(myScreen, 0, 0, "Yellow text on translucent blue!");
     */
    this.SetColours = setColours;
    /**
     * <p>Print text on {@link SeniorDads.ScreenHandler.Screen} object.</p>
     * <p>The following VT52 codes can be used within the text. (Case sensitive.)</p>
     * <ul>
     * <li><strong>chr(27)+'p'</strong> - invert text colours.
     * <li><strong>chr(27)+'q'</strong> - revert text colours.
     * <li><strong>chr(27)+'Y'+chr(x+32)+chr(y+32)</strong> - position following characters at text coordinates (x,y) .
     * @function
     * @param {SeniorDads.ScreenHandler.Screen} screen Screen to write text to.
     * @param {number} px *Text* x-coordinate to print at.
     * @param {number} py *Text* y-coordinate to print at.
     * @param {string} text Text to print.
     */
    this.PrintText = printText;

    /*
     * When the font has been loaded, process into a font buffer.
     * 
     * The font buffer is composed of a hash which allows easy access by ASCII character.
     * Each element of the hash contains an array of boolean values representing each pixel 
     * of the font for a particular character.
     */
    function processFont(fontData) {
        fontBuffer = new Object;						// Initalise the font buffer
        var ascii_start = " ".charCodeAt(0);			// The font data starts at " "
        var ascii_end = "~".charCodeAt(0) - 1;			// ... and ends at "~".
        var fontDataView = new DataView(fontData);		// Set up view of binary font data
        var fontDataPointer = 0;
        var currentChar;
        for (var i = ascii_start; i <= ascii_end; i++) { 	// Start iterating through the characters of the font
            currentChar = String.fromCharCode(i);
            fontBuffer[currentChar] = new Array(8 * 8);		// Set up array in hash for the current character
            for (var j = 0; j < 8; j++) {					// Font character is 8 bytes long, and eachbyte represents a pixel row
                var currentCharLine = fontDataView.getUint8(fontDataPointer++);	// Get a byte 
                for (var k = (8 - 1); k > -1; --k)			// For each of the 8 pixels, set true or false in the font buffer
                    fontBuffer[currentChar][(j * 8) + (8 - k)] = ((currentCharLine & (1 << k)) > 0);
            }
        }
        // Now the font is processed, we can flag the resource as loaded.
        loaded = true;
    }

    /*
     * Set Text mode.
     * 
     * 0 = lo-res (40 x 24), 1 = med-res (80 x 24).
     * 
     * There's not really too much to this. However, there may be more when Hi-res (Mode 2) is implmented.
     */
    function setTextMode(setGraphicsMode) {
        setGraphicsMode = (typeof setGraphicsMode === "undefined") ? 0 : setGraphicsMode; 			// if not set, assume mode 0
        setGraphicsMode = ((0 > setGraphicsMode) || (setGraphicsMode > 1)) ? 0 : setGraphicsMode; 	// If outside 0-1 range, assume mode 0
        // Set text width and height according to mode.
        switch (setGraphicsMode) {
            case 0:
                width = 40;
                height = 24;
                break;
            case 1:
                width = 80;
                height = 24;
                break;
        }
    }

    /*
     * Set text colours
     */
    function setColours(myForeground, myBackground) {
        foreground = myForeground;
        background = myBackground;
    }

    /*
     * Print text onto screen.
     */
    function printText(screen, px, py, text) {
        var context = screen.context;
        var ctrl = String.fromCharCode(27);		// Control code start for VT52 
        var lines = text.split('\n');			// Split into lines by carriage return.
        var linecount = lines.length;
        var gfxX = px * 8;						// Convert text coordinates into canvas coordinates.
        var gfxY = py * 8;
        var h, i, j, length, charBuffer, canvasDataPosition, charBufferPointer, colour, currentLine;
        for (h = 0; h < linecount; h++) {		// Go through each line
            currentLine = lines[h];				// For each line...
            length = currentLine.length;
            for (i = 0; i < length; i++) {		// ... go through each character
                if (currentLine.charAt(i) == ctrl) {	// If VT52
                    i++;								// .. next is control code
                    switch (currentLine.charAt(i++)) {
                    case "p":							// ESC p - invert text colours
                        invertTextColours();
                        break;
                    case "q":							// ESC q - Un-invert text colours
                        invertTextColours();
                        break;
                    case "Y":							// ESC Y - Position text
                        py = currentLine.charCodeAt(i++) - 32;	// Get text coords from next two characters
                        px = currentLine.charCodeAt(i++) - 32;  // Coords are expressed as chr(x+32)+chr(y+32)
                        gfxX = px * 8;							// Convert text coordinates into canvas coordinates.
                        gfxY = py * 8;
                        break;
                    }
                    i--;
                } else {
                    charBuffer = fontBuffer[currentLine.charAt(i)];		// Get the font buffer for the character to print.
                    var canvasData = context.createImageData(8, 8);		// Set up image data for character.
                    canvasDataPosition = 0;
                    charBufferPointer = 0;
                    for (j = 0; j < (8 * 8); j++) {						// For each of the pixels
                    	// Set the colour according whether the pixel is on.
                        colour = (charBuffer[charBufferPointer++]) ? foreground : background;
                        canvasData.data[canvasDataPosition++] = colour[0];		// Now plot it.
                        canvasData.data[canvasDataPosition++] = colour[1];
                        canvasData.data[canvasDataPosition++] = colour[2];
                        canvasData.data[canvasDataPosition++] = colour[3];
                    }
                    charCanvasContext.putImageData(canvasData, 0, 0);			// Draw the character on screen.
                    context.drawImage(characterCanvas, gfxX, gfxY);
                    gfxX += 8;		// Go onto next character
                    px++;
                }
            }
            gfxY += 8;		// Now we're at the end of line, go onto the next line.
            py++;
            gfxX = 0;
            px = 0;
        }
        x = px;
        y = py;
    }

    /*
     * Invert text colours
     */
    function invertTextColours() {
        var temp = foreground;
        foreground = background;
        background = temp;
    }
};