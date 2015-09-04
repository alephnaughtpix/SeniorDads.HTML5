/**
 * @fileOverview Senior Dads Loader utilities.
 * @author The Senior Dads
 * @version 0.4
 */

/**
 * @namespace SeniorDads.Loader
 */
 SeniorDads.CreateNameSpace("SeniorDads.Loader");

/**
 * <h1>SeniorDads.Loader</h1>
 * <p><strong>HTML5 Demo Resource Loader</strong></p>
 * <p><em>loader = new SeniorDads.Loader(resources, loadedCallback, processChangedCallback, checkInterval);</em></p>
 * <p>Loading resources in HTML5 demos is a real pain in the bum, since they're all loaded 
 * asynchronously over a network connection. Therefore you need to check, before you use your 
 * resources, that they've actually been loaded! In addition, there might be some initialisation
 * procedures to perform on the resources (eg in the case of music files), so it's not <em>really</em>
 * loaded until that is done.</p><p>Hence this class, which keeps track of the resource wrapper 
 * classes whilst they load resources. (in this case, this {@link SeniorDads.Font}, {@link SeniorDads.Image}, {@link SeniorDads.Music}, {@link SeniorDads.Music.SoundBox}
 * and {@link SeniorDads.Loader.Binary} classes.)</p>
 * @constructor
 * @class HTML5 Demo Resource Loader
 * @param {Object[]} resources An array of instances of resource wrapper classes
 * @param {function} [loadedCallback] The function to call whenever all resources have been loaded
 * @param {function} [processChangedCallback] Function to call if we're monitoring change in progress of loading resources
 * @param {number} [checkInterval=500] How often to check the loading progress in milliseconds
 * @property {number} count The number of resources to load
 * @property {number} toLoad The number of resources that have been loaded
 * @property {number} loaded How many have been loaded
 * @property {boolean} completed Whether all loading of resources has been completed
 * @memberOf SeniorDads
 * @example 
 *  var progressIndicator = document.getElementById('progressIndicatorPlaceholder');
 *  
 * 	var loader = new SeniorDads.Loader(
 * 		[
 * 			screen1,
 * 			music1,
 * 			font1,
 * 			screen2,
 * 			music2,
 * 			font2,
 * 			binaryFile
 * 		],
 * 		completed,
 * 		progress,
 * 		1000
 *  );
 *  
 *  function progress(loaded, toLoad) {
 *  	progressIndicator.innerHTML = loaded + " loaded, " + toLoad + " to load.";
 *  }

 *  function completed() {
 *  	progressIndicator.innerHTML = "Loading complete.";
 *  }
 */
SeniorDads.Loader = function(resources, loadedCallback, processChangedCallback, checkInterval) {
    if (loadedCallback === undefined) loadedCallback = null;	// If there's no call back (Why!?) we don't need to check progress
    if (processChangedCallback === undefined) processChangedCallback = null;	// If there's no call back for a progress check
    if (checkInterval === undefined) checkInterval = 500;		// Default for optional value
    var loaderCheckInterval;									// Set timeout pointer for check
    // Get the "count" of resources to load. From that we can get the "size" of each and determine the final total from that.
    var count = resources.length;
    var toLoad = 0;	
    // Initialise the "size" of resources we need to load
    for (var i = 0; i < count; i++)
        	toLoad += resources[i].resource_size;
    count = toLoad;			// Now set that up as the amount of resources
    var loaded = 0;			// Assume we haven't loaded anything yet.
    var completed = false;	//

    // Set properties
    Object.defineProperties(this, {
    	count:     { get: function() { return count; } },	 // Amount of resources
    	toLoad:    { get: function() { return toLoad; } },   // How many remain to load
    	loaded:    { get: function() { return loaded; } },   // How many have been loaded
    	completed: { get: function() { return completed; } } // Whether all loading has been completed
    } );
//    this.count = function() { return count; };			// Amount of resources
//    this.toLoad = function() { return toLoad; };		// How many remain to load
//    this.loaded = function() { return loaded; };		// How many have been loaded
//    this.completed = function() { return completed; };	// Whether all loading has been completed

    
    // Set public methods
    /** 
     * <p>Scan the the the resources, and total up what's loaded, 
     * and what remains to be loaded.</p>
     * 
     * <p>Each resource wrapper class has three properties to 
     * allow us to determine loading progress:</p>
     * <ul>
     * <li>loaded - set to true if the resource is loaded.</li>
     * <li>resource_size - the amount of elements to "load" in the resource.</li>
     * <li>resource_loaded - the amount of elements already loaded.</li>
     * </ul>
     * <p>The last two properties allow us an amount of granularity in monitoring the 
     * loading progress. (eg for progress indicators) For stuff like images, binary 
     * files etc., the resource size can simply be one. However, it can be different
     * values as the need suits. eg For the SoundBox class, we've put a resource size 
     * of 8, as that takes a long time to initialise compared to other operations, but 
     * it does it in 8 chunks.</p>
     * 
     * <p>See the LoadBinary class below for a simple example of these properties are set.</p>
     * @function
     */
    this.CheckProgress = checkProgress;	

    // If we have a callback, start off checking the loading progress
    if (loadedCallback != null)
        loaderCheckInterval = setInterval(checkLoader, checkInterval);

    /* Checking the loading process. 
     * 
     * This is called every so often (usually every 500ms) until laoding is completed.
     */
    function checkLoader() {
        checkProgress();						// Checking the progress
        if (completed) {						// If it's complete
            clearInterval(loaderCheckInterval);	// ... Stop the process
            if (loadedCallback != null)			// ... and if there's a callback
                loadedCallback();				// ... call it.
        }
    }

    // Single check of loading progress
    function checkProgress() {
        var local_toLoad = 0;
        var local_loaded = 0;
        var length = resources.length;
        for (var i = 0; i < length; i++)
        	// Check 1: if the resource has fully loaded
            if (resources[i].loaded) 
            	local_loaded += resources[i].resource_size;
            // Check 2: if the resource has partially loaded
            else {
            	local_loaded += resources[i].resource_loaded;
            	local_toLoad += resources[i].resource_size - resources[i].resource_loaded;
            }
        // If there's been a change in the progress, save that
        if ((local_toLoad != toLoad) || (local_loaded != loaded)) {
        	toLoad = local_toLoad;
        	loaded = local_loaded;
        	// If there's a callback on change (eg for progress indicators), call that
        	if (processChangedCallback != null)
        		processChangedCallback(loaded, toLoad); // Callback will receive info of the progress
        }
        if (toLoad == 0)			// If there's nothing left to load
            completed = true;		// ... we're finished!
    }
};

/**
 * <h2>Binary</h2>
 * <p><strong>Loads a binary file from a URL into a buffer, and call a callback with the buffer as parameter.</strong></p>
 * <p><em>var binaryFile = new SeniorDads.Loader.Binary(url, buffer, loadedCallBack);</em><p>
 * <p>This a simple example of a resource wrapper class.</p>
 * @constructor
 * @class Load a binary file resource
 * @param {string} url - URL of binary file.
 * @param {ArrayBuffer} buffer - pointer to buffer for file to be loaded into.
 * @param {function} loadedCallBack - a function to call when the file has been loaded.
 * @property {boolean} loaded - Whether the file has loaded.
 * @property {number} resource_size - Size of the resource. (1 in this case.)
 * @property {number} resource_loaded - The amount already loaded. (0-1 in this case.)
 * @example
 *  var progressIndicator = document.getElementById('progressIndicatorPlaceholder');
 *  
 *  var binaryBuffer;
 *  var binaryFile = new SeniorDads.Loader.Binary("myBinaryFile.bin", binaryBuffer,
 *		function (responseBuffer) { binaryBuffer = responseBuffer; }
 *  );
 *  
 * 	var loader = new SeniorDads.Loader( [ binaryFile ], completed, progress, 1000 );
 *  
 *  function progress(loaded, toLoad) {
 *  	progressIndicator.innerHTML = loaded + " loaded, " + toLoad + " to load.";
 *  }

 *  function completed() {
 *  	progressIndicator.innerHTML = "Loading complete.";
 *  }
 */
SeniorDads.Loader.Binary = function (url, buffer, loadedCallBack) {
    var loaded = false;				// Start off assuming we haven't loaded the file.
    var resource_loaded = 0;		//
    
    // Set properties
    this.loaded = function () { return loaded; };					// Whether the file has loaded
    this.resource_size = function() { return 1; };					// Size of the resource
    this.resource_loaded = function () { return resource_loaded; };	// The amount already loaded
    
    // Make a new request to load the file.
    var binaryLoader = new XMLHttpRequest();
    binaryLoader.open("GET", url, true);
    binaryLoader.overrideMimeType('text/plain; charset=x-user-defined');
    binaryLoader.responseType = "arraybuffer";
    // Set up what to do when the file is loaded
    binaryLoader.onload = function (myEvent) {		// When the file is loaded...
        buffer = binaryLoader.response;				// ... get the binary data into the buffer
        loaded = true;								// ... flag up the resource as loaded.
        resource_loaded = 1;						//
        if (loadedCallBack != null)					// ... If there's a callback ...
            loadedCallBack(buffer);						// ... call the callback with the buffer as a parameter
    };
    // End of set up for when the file is loaded
    binaryLoader.send(); 	// Now send the request.
};
