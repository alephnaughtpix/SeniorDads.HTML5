SeniorDads.CreateNameSpace("SeniorDads.Demos");

SeniorDads.Demos.Test = function(placeholder, name, callbackOnEnd) {
    this.blah = "s3N10r dAdZz ruL3c-=- 1n hTmL5!!!!1!1!!";
    if (!(callbackOnEnd === undefined)) callbackOnEnd = null;
    var testDemo, music_SDFanfare, music_GMF, loader, srcFontScreen, destFontScreen, demoWindow;
    var loadedCallback = null;   
    var progressIndicator = document.getElementById('progressIndicatorPlaceholder');
    testDemo = new SeniorDads.Demos.Demo(null, load, init, endDemo);
    testDemo.add( new SeniorDads.Demos.Demo.DemoPart( null, fanfare, fanfareAbort) );
    testDemo.add( new SeniorDads.Demos.Demo.DemoPart( null, start, startAbort) );
    testDemo.add( new SeniorDads.Demos.Demo.DemoPart( null, samba, sambaAbort) );
    this.Load = testDemo.load;
    this.LoadAndStart = testDemo.loadAndStart;
    this.Abort = testDemo.abort;

    // Load demo resources and intialise
    function load(altLoadedCallback) {
        if (!(altLoadedCallback === undefined)) loadedCallback = altLoadedCallback;
        demoWindow = new SeniorDads.ScreenHandler(placeholder, name, 320, 200);
        srcFontScreen = demoWindow.add("fontSource", 1, new SeniorDads.Image("../common/resources/source/largeFont_src.png"));
        destFontScreen = demoWindow.add("fontDest", 1);
        music_SDFanfare = new SeniorDads.Music.SoundBox(DameVL_SDFanfare);
        music_GMF = new SeniorDads.Music.SoundBox(DameVL_GMF);
        music_Samba = new SeniorDads.Music.SoundBox(DameVL_Samba);
        loader = new SeniorDads.Loader([
            srcFontScreen,
            music_SDFanfare,
            music_GMF,
            music_Samba
        ], loadedCallback, progress);
        // Event listener to allow download of screen as a PNG
		var downloadButton = document.getElementById('download');
		downloadButton.addEventListener('click', function (e) {
			var dataURL = destFontScreen.canvas.toDataURL('image/png');
			downloadButton.href = dataURL;
		});
    }
    
    /*
     * Loading progress indicator
     */
    function progress(loaded, toLoad) {
    	progressIndicator.innerHTML = loaded + " loaded, " + toLoad + " to load!!!!!!!!1";
    }
    
    function init() {
    	srcFontScreen.Show();
    	var context = destFontScreen.context;
    	var srcX = srcY = destX = destY = 0;
    	var width = 32;
    	var height= 16;
    	srcFontScreen.Hide();
    	destFontScreen.Show();
    	noOfChars = 12 * 8;
    	for (var i = 0; i < noOfChars; i++ ) {
    		context.drawImage(srcFontScreen.canvas, srcX, srcY, width, 16, destX, destY, width, height);
    		srcY += height;
    		if (srcY>(11*height)) {
    			srcY = 0;
    			srcX += width;
    		}
    		destX += width;
    		if (destX > (7*width)) {
    			destX = 0;
    			destY += height;
    		}
    	}
    }
    
    /* SD Fanfare
    *
    */    		
    function fanfare() {
    	progressIndicator.innerHTML = "THE SENIOR DADDS JS-MUSIX DEMO!!!!";
    	music_SDFanfare.play();
    	music_SDFanfare.waitUntilEnd(end);
    	
        function end() {
            //demoWindow.FlushWaitVbl();
            testDemo.next();
        }
    }


    function fanfareAbort() {
        //demoWindow.FlushWaitVbl();
    	music_SDFanfare.stop();
    }

    /* Intro screen
     *
     * Displays text title, and unevenly craps on screen 
     */    		
    function start() {
    	progressIndicator.innerHTML = '"March of the All-Time GMF Coders Battallion 101" by DAME VERA LYNN of tha SENIOR DADS!!!!';
    	music_GMF.play();
    	music_GMF.waitUntilEnd(end);
    	
        function end() {
            //demoWindow.FlushWaitVbl();
            testDemo.next();
        }
    }

    function startAbort() {
        //demoWindow.FlushWaitVbl();
    	music_GMF.stop();
    }

    function samba() {
    	progressIndicator.innerHTML = '"Scottish September Samba Shit" by DAME VERA LYNN of tha SENIOR DADS!!!!';
    	music_Samba.play();
    	music_Samba.waitUntilEnd(end);
    	
        function end() {
            //demoWindow.FlushWaitVbl();
        	progressIndicator.innerHTML = 'THA END!!!!!!!!!!!!!!<br/><br/>&copy: 2015 Senior Dads';
            testDemo.next();
        }
    }

    function sambaAbort() {
    	music_Samba.stop();
        //demoWindow.FlushWaitVbl();
    }

    function endDemo() {
    }
    
    
};