SeniorDads.CreateNameSpace("SeniorDads.Demos");

SeniorDads.Demos.MonoMental = function(placeholder, name, callbackOnEnd) {
    this.blah = "s3N10r dAdZz ruL3c-=- 1n hTmL5!!!!1!1!!";
    if (!(callbackOnEnd === undefined)) callbackOnEnd = null;
    var nonoMental, demoWindow, 
    basilPic,
    mono1Pic,
    mono2Pic,
    mono3Pic,
    mono4Pic,
    codearokePic,
    holePic,
    jasonSPic,
    firstMonoPic,
    presentsPic,
    yogiePic,
    font, music, loader;
    var loadedCallback = null;    
    nonoMental = new SeniorDads.Demos.Demo(null, load, null, endDemo);
    nonoMental.add( new SeniorDads.Demos.Demo.DemoPart( null, start, startAbort) );
    nonoMental.add( new SeniorDads.Demos.Demo.DemoPart( null, main, endDemo) );
    nonoMental.add( new SeniorDads.Demos.Demo.DemoPart( null, endDemo, null) );
    this.Load = nonoMental.load;
    this.LoadAndStart = nonoMental.loadAndStart;
    this.Abort = nonoMental.abort;

    // Load demo resources and intialise
    function load(altLoadedCallback) {
        if (!(altLoadedCallback === undefined)) loadedCallback = altLoadedCallback;
        demoWindow = new SeniorDads.ScreenHandler(placeholder, name, 640, 400);
        basilPic = demoWindow.add("basil", 2, new SeniorDads.Image("resources/basil.png"));
        mono1Pic = demoWindow.add("mono1", 2, new SeniorDads.Image("resources/monom1.png"));
        mono2Pic = demoWindow.add("mono2", 2, new SeniorDads.Image("resources/monom2.png"));
        mono3Pic = demoWindow.add("mono3", 2, new SeniorDads.Image("resources/monom3.png"));
        mono4Pic = demoWindow.add("mono4", 2, new SeniorDads.Image("resources/monom4.png"));
        codearokePic = demoWindow.add("codearoke", 2, new SeniorDads.Image("resources/dream.png"));
        holePic = demoWindow.add("hole", 2, new SeniorDads.Image("resources/hole.png"));
        jasonSPic = demoWindow.add("jasonS", 2, new SeniorDads.Image("resources/great.png"));
        firstMonoPic = demoWindow.add("firstmono", 2, new SeniorDads.Image("resources/great2.png"));
        presentsPic = demoWindow.add("presents", 2, new SeniorDads.Image("resources/presents.png"));
        yogiePic = demoWindow.add("yogie", 2, new SeniorDads.Image("resources/yogie.png"));
        font = new SeniorDads.Font.Tos("../common/resources/tosfont.bin");
        music = new SeniorDads.Music("YM", "resources/mono_ym.bin", false);
        loader = new SeniorDads.Loader([
            basilPic, 
            font, music
        ], loadedCallback);
        textOverlayScreen = demoWindow.add("textOverlay", 2);
        initTextScreen = demoWindow.add("initText", 2);
    }

    /* Intro screen
     *
     * Displays text title, and unevenly craps on screen 
     */    		
    function start() {
        var pauseTable = new Uint16Array([5, 1, 2, 1, 5, 1, 3, 4, 5, 6, 2, 1, 1, 1, 1, 4, 50, 1]);
        var x = 0;
        var y = 0;
        var context = initTextScreen.context();
        initTextScreen.Clear('#ffffff');
        font.PrintText(initTextScreen, 0, 0, 'THE SENIOR DADS\n\n\npresent\n\nMONOMENTAL!');
        initTextScreen.Show();
        demoWindow.WaitVbl(200, crapOnScreen);

        function crapOnScreen() {
            var pause;
            var length = pauseTable.length;
            var pausePointer = 0;
            nextCrapStep();

            function nextCrapStep() {
                if (pausePointer < length) {
                    pause = pauseTable[pausePointer];
                    demoWindow.WaitVbl(pause, plotCrap);
                } else {
                    end();
                }
            }

            function plotCrap() {
                plotPoint(truColourToWebColour(pause));
                for (var j = (640 / 4 - 1); j > -1; j--) {
                    plotPoint(truColourToWebColour(j));
                    pause = pause ^ j;
                    pause = !pause;
                    plotPoint(truColourToWebColour(pause));
                }
                pausePointer++;
                nextCrapStep();
            }
        }

        function end() {
            demoWindow.FlushWaitVbl();
            initTextScreen.Hide();
            nonoMental.next();
        }

        function truColourToWebColour(truColourVal) {
            //Value is in format: RRRRrGGGGGgBBBBb
            //& %1111100000000000 >> 12 = %RRRR -> 0-0xf
            //& %0000011111100000 >> 7  = %GGGG -> 0-0xf
            //& %0000000000011111 >> 1  = %BBBB -> 0-0xf
            var r = ((truColourVal & 63488) >> 12).toString(16);
            var g = ((truColourVal & 2016) >> 7).toString(16);
            var b = ((truColourVal & 31) >> 1).toString(16);
            return '#' + r + r + g + g + b + b;
        }

        function plotPoint(colour) {
            context.fillStyle = colour;
            context.fillRect(x++, y, 1, 1);
            if (x > 320) {
                x = 0;
                y++;
            }
        }
    }
    
    function startAbort() {
        demoWindow.FlushWaitVbl();
    }

    /* Main screen
     * 
     */
    function main() {
        var texts = [
            ' REALTIME FIRE EFFECT',
            '         TAKES 0NE SCANLINE',
            '  YET AGAIN WE CANNOT BE BEATEN'
        ];
        var demoDelay = 140;
        var length = texts.length - 1;
        var textPointer = 0;
        var textYstart = 20;
        var from = 0;
        var textY = textYstart;
        var showText = true;
        var textContext = textOverlayScreen.context();
        var currentText;
        font.SetColours([0xff, 0xff, 0xff, 0xff], [0, 0, 0, 0xff]);
        music.play();
        fire1Screen.Show();
        textOverlayScreen.Show();
        var mainAnimDelay = setInterval(mainAnim, demoDelay);

        function mainAnim() {
            if (textY == textYstart) {
                if (textPointer > length) {
                    clearInterval(mainAnimDelay);
                    showText = true;
                    demoWindow.WaitVbl(70, end);
                } else {
                    currentText = texts[textPointer++];
                    from = textY * 8;
                    font.PrintText(textOverlayScreen, 0, textY, currentText);
                }
            } else {
                font.PrintText(textOverlayScreen, 0, textY, currentText);
                textContext.clearRect(0, from, 320, 8);
                from = textY * 8;
            }
            textY--;
            if (textY < 0) {
                textY = textYstart;
            }
        }
        
        function end() {
        	nonoMental.next();
        }
    }

    function endDemo() {
        music.stop();
        initTextScreen.Clear();
        initTextScreen.Show();
        fire2Screen.Hide();
        textOverlayScreen.Hide();
        if (callbackOnEnd != null)
            callbackOnEnd();
    }

};