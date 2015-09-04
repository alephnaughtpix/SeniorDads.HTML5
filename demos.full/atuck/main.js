SeniorDads.CreateNameSpace("SeniorDads.Demos");

SeniorDads.Demos.AnalTuck = function(placeholder, name, callbackOnEnd) {
    this.blah = "s3N10r dAdZz ruL3c-=- 1n hTmL5!!!!1!1!!";
    if (!(callbackOnEnd === undefined)) callbackOnEnd = null;
    var analTuck, demoWindow, fire1Screen, fire2Screen, initTextScreen, textOverlayScreen, font, music, loader;
    var loadedCallback = null;    
    analTuck = new SeniorDads.Demos.Demo(null, load, null, endDemo);
    analTuck.add( new SeniorDads.Demos.Demo.DemoPart( null, start, startAbort) );
    analTuck.add( new SeniorDads.Demos.Demo.DemoPart( null, main, endDemo) );
    analTuck.add( new SeniorDads.Demos.Demo.DemoPart( null, endDemo, null) );
    this.Load = analTuck.load;
    this.LoadAndStart = analTuck.loadAndStart;
    this.Abort = analTuck.abort;

    // Load demo resources and intialise
    function load(altLoadedCallback) {
        if (!(altLoadedCallback === undefined)) loadedCallback = altLoadedCallback;
        demoWindow = new SeniorDads.ScreenHandler(placeholder, name, 320, 240);
        fire1Screen = demoWindow.add("fire1", 2, new SeniorDads.Image("resources/fire1.png"));
        fire2Screen = demoWindow.add("fire2", 2, new SeniorDads.Image("resources/fire2.png"));
        font = new SeniorDads.Font.Tos("../common/resources/tosfont.bin");
        music = new SeniorDads.Music("MOD", "resources/fanfare.bin", true);
        loader = new SeniorDads.Loader([
            fire1Screen, fire2Screen, font, music
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
        var context = initTextScreen.context;
        initTextScreen.Clear('#ffffff');
        font.PrintText(initTextScreen, 0, 0, 'THE SENIOR DADS\n\n\npresent\n\nTHE aNaL TuCK demo!\n\n68030 code by Nonce\nDSP code by Jessie');
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
            analTuck.next();
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
        var textContext = textOverlayScreen.context;
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
            swapScreens();
        }

        function swapScreens() {
            if (showText) {
                fire1Screen.Hide();
                fire2Screen.Show();
                textOverlayScreen.Show();
            } else {
                fire1Screen.Show();
                fire2Screen.Hide();
                textOverlayScreen.Hide();
            }
            showText = !(showText);
        }
        
        function end() {
        	analTuck.next();
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