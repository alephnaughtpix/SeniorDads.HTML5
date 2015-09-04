/**
 * @fileOverview Senior Dads image resources.
 * @author The Senior Dads
 * @version 0.4
 */

/**
 * @namespace SeniorDads.Image
 */
SeniorDads.CreateNameSpace("SeniorDads.Image");

/**
 * <h1>SeniorDads.Image</h1>
 * <p><strong>{@class}</strong></p>
 * <p><em>var myFont = new SeniorDads.Image(url, loadedCallback, autoload);</em></p>
 * <p>This is a resource handler which handles the loading of image resources.</p>
 * <p>At the moment, this quite a simple wrapper class, which only handles browser-compatible images.
 * however, in future, it will also handle Atari Degas format images.</p>
 * @class Senior Dads image resource
 * @param {string} url URL of the image file.
 * @param {function} [loadedCallback] Function to call when image is loaded.
 * @param {boolean} [autoload=true] Whether to autoload image.
 * @property {Image} element Image object.
 * @property {Image} imageData Image object. (Same as 'element'.)
 * @property {string} type The type of image. (eg "gif", "png", etc.)
 * @property {boolean} isBrowserImage Whether the image is a browser-compatible image.
 * @property {boolean} isDegasImage Whether the image is a Degas (Atari) format image.
 * @property {boolean} loaded Whether the resource has been loaded.
 * @property {number} resource_size Size of resource
 * @property {number} resource_loaded Resource to be loaded
 * @property {function} loadedCallback Function to call when image is loaded.
 */
SeniorDads.Image = function(url, loadedCallback, autoload) {
    if (loadedCallback === undefined) loadedCallback = null;		// By default, there is no callback.
    if (autoload === undefined) autoload = true;					// By default, the image autoloaded.

    var type = getType(url);						// Get image type.
    var element = null;								// Set up container for image.
    var hasLoaded = false;								// Start off assuming we haven't loaded the image file.
    var isBrowserImage = isBrowserImage(url);		// Determine if it's a browser-compatible image.
    var isDegasImage = isDegasImage(url);			// Determine if it's a Degas (Atari) image.
    
    // Set up properties.
//    this.element = function() { return element; };					// The Image object
//    this.imageData = function () { return element; };				// The Image object (Same as 'element'.)
//    this.type = function () { return type; };						// The type of image. (eg "gif", "png", etc.)
//    this.isBrowserImage = function () { return isBrowserImage; };	// Whether the image is a browser-compatible image.
//    this.isDegasImage = function () { return isDegasImage; };		// Whether the image is a Degas (Atari) format image.
//    this.loaded = function () { 
//    	return hasLoaded; 
//    	};					// Whether the image has loaded
//    this.resource_size = function () { return 1; };						 // Size of the resource
//    this.resource_loaded =  function () { return (hasLoaded) ? 1 : 0; }; // The amount already loaded (we get this from the instance of the class we're wrapping.)
    Object.defineProperties(this, {
    	element:         { get: function() { return element; } },				// The Image object
    	imageData:       { get: function() { return element; } },				// The Image object (Same as 'element'.)
    	type:          	 { get: function() { return type; } },					// The type of image. (eg "gif", "png", etc.)
    	isBrowserImage:  { get: function() { return isBrowserImage; } },		// Whether the image is a browser-compatible image.
    	isDegasImage:    { get: function() { return isDegasImage; } },			// Whether the image is a Degas (Atari) format image.
    	loaded:          { get: function() { return hasLoaded; } },				// Whether the image file has loaded.
    	resource_size:   { get: function() { return 1; } },						// Size of the resource.
    	resource_loaded: { get: function() { return (hasLoaded) ? 1 : 0; } }	// The amount already loaded .
    } );

    // "Image loaded" callback property. This a little more complex,
    // as there's a "set" method which requires intervention.
    Object.defineProperty(this, "loadedCallback",
            {
                get: function() { return loadedCallback; },
                set: function(myLoadedCallback) {
                    loadedCallback = myLoadedCallback;
                	// If the image is already loaded, run the callback. (Otherwise it'll never get run.)
                    if ((hasLoaded) && (myLoadedCallback != null)) 
                    	myLoadedCallback();
                }
            });

    // Set up object methods
    /**
     * Load the image.
     * @function
     * @param {function} [loadingFinished] Function to call when image is loaded.
     */
    this.load = load;
    
    // If we're autoloading, (default) start the loading process.
    if (autoload) load(loadedCallback);

    /*
     * Load the image.
     * 
     * At the moment this handles browser-compatible images only.
     */
    function load(loadingFinished) {
        if (loadingFinished === undefined) loadingFinished = null;
        loadedCallback = loadingFinished;
	    if (isBrowserImage) {				// If it's a browser image,...
	        element = new Image();			// ... create new image DOM element,
	        element.src = url;				// ... set it to start loading,
	        element.onload = function() {	// When it's loaded,...
	        	hasLoaded = true;			// ... set the loaded flag.
	            if (loadedCallback != null) loadedCallback();	// If there's a callback, run that.
	        };
	    }
    }

    /*
     * Test if it's a browser-compatible image.
     */
    function isBrowserImage(imageUrl) {
        return (imageUrl.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    /*
     *  Test if it's a Degas image.
     *  
     *  Degas Elite (as well as it's predecessor Degas) was a very popular 
     *  art program on the Atari ST. It was developed by Tom Hudson in 1986, 
     *  and published by Batteries Included software. 
     *  
     *  The uncompressed version of the picture format was literally a full ST 
     *  colour palette setup as it would be stored in the ST palette registers, 
     *  followed by the picture as it would be stored in ST screen memory. 
     *  As a result, the picture format (Which other arts programs on the ST 
     *  such as Deluxe Paint ST could load and save.) was very popular with coders, 
     *  and got used a lot for graphics in Senior Dads demos!
     *  
     */
    function isDegasImage(imageUrl) {
        return (imageUrl.match(/\.(pc?|pi?)$/) != null);
    }
    
    /*
     * Get the type of image.
     * 
     * This returns the file extension of the image URL.
     */
    function getType( imageFilename ) {
    	var startCheck = imageFilename.lastIndexOf(".");	// Find where the file extension is.
    	var type = null;									// Return value if we don't find a file extension.
    	if (startCheck > -1)								// if there's a file extension, extract it.
    		type = imageFilename.substring(startCheck+1, imageFilename.length - startCheck);
    	return type;
    }
};