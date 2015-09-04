SeniorDads.CreateNameSpace("SeniorDads.Demos");

SeniorDads.Demos.ColonicIrrigation = function (placeholder, name, callbackOnEnd) {
    this.blah = "m3Ga 0pT1m1S3d hTmL£ c0D3zZ bY dA s3N10r dAdZz- w33 ruL3c!!!!1!1!!";
    if (!(callbackOnEnd === undefined)) callbackOnEnd = null;
    var demoWindow,
        water1Screen, 
        water2Screen,
        initTextScreen,
        currentDrawScreen,
        displayedScreen,
        font,
        music,
        endGfxBin,
        endGfxBinLoader,
        loader,
        endCreditsSampleData,
        mainAnimDelay,
        sampleWave,
        samplePlayer;
    var demoWidth = 384;
    var white = '#ffffff';
    var black = '#000000';
    var ctrl = String.fromCharCode(27);
    var loadedCallback = null;
    var bomber = new SeniorDads.Bomb();
    var colonicIrrigation = new SeniorDads.Demos.Demo(null, load, init, endDemo);
    colonicIrrigation.add( new SeniorDads.Demos.Demo.DemoPart( null, start, startAbort) );
    colonicIrrigation.add( new SeniorDads.Demos.Demo.DemoPart( null, main, endDemo) );
    colonicIrrigation.add( new SeniorDads.Demos.Demo.DemoPart( null, endCredits, endDemo) );
    colonicIrrigation.add( new SeniorDads.Demos.Demo.DemoPart( null, endCrash, endDemo) );
    colonicIrrigation.add( new SeniorDads.Demos.Demo.DemoPart( null, endDemo, null) );
    this.Load = colonicIrrigation.load;
    this.LoadAndStart = colonicIrrigation.loadAndStart;
    this.Abort = colonicIrrigation.abort;

    // Load demo resources and intialise
    function load(altLoadedCallback) {
        if (!(altLoadedCallback === undefined)) loadedCallback = altLoadedCallback;
        demoWindow = new SeniorDads.ScreenHandler(placeholder, name, 384, 240);
        water1Screen = demoWindow.add("water1", 2);
        water2Screen = demoWindow.add("water2", 2);
        initTextScreen = demoWindow.add("initText", 2);
        font = new SeniorDads.Font.Tos("../common/resources/tosfont.bin");
        music = new SeniorDads.Music("MOD", "resources/theme.bin", true);
        endGfxBinLoader = new SeniorDads.Loader.Binary("resources/colend.bin", endGfxBin,
            function (buffer) {
                endGfxBin = buffer;
            }
        );
        loader = new SeniorDads.Loader([
            font, music, endGfxBinLoader
        ], loadedCallback);
    }
    
    function init() {
        createEndCreditsSample();
    }
    
    function createEndCreditsSample() {
    	var i;
    	var samplePointer = 0;
    	var sampleSize = 25*(1024/8);
    	endCreditsSampleData = [];
    	for (i=0; i < sampleSize; i++) {
    		endCreditsSampleData[samplePointer++] = Math.round(255 * Math.random());
    		samplePointer++;
    	}
    	for (i=0; i < sampleSize; i++) {
    		samplePointer++;
    		endCreditsSampleData[samplePointer++] = Math.round(255 * Math.random());
    	}
        sampleWave = new RIFFWAVE();
        sampleWave.header.numChannels = 2;
        sampleWave.header.bitsPerSample = 8;
        sampleWave.header.sampleRate = 25*1024;
        sampleWave.Make(endCreditsSampleData);
        samplePlayer = new Audio(sampleWave.dataURI);
    	samplePlayer.loop = true;
    }

    /* Intro screen
    *
    * Displays text title, and unevenly craps on screen 
    */
    function start() {
    	window.onkeypress = end;
        var pauseTable = new Uint16Array([5, 1, 2, 1, 5, 1, 3, 4, 5, 6, 2, 1, 1, 1, 1, 4, 50, 1]);
        var x = 0;
        var y = 0;
        var context = initTextScreen.context;
        initTextScreen.Clear(white);
        font.PrintText(initTextScreen, 0, 0,
            '       ' + ctrl + 'pTHE SENIOR DADS are Back!!!!!' + ctrl + 'q\n\n\n' +
                '                  with the\n\n' +
                '         ' + ctrl + 'pCOLONIC IRRIGATION demo!' + ctrl + 'q\n\n' +
                '          68030 code by Old Fart\n\n' +
                '         DSP code by Doddering Git\n\n' +
                '          Music by Dame Vera Lynn\n\n\n\n\n\n\n\n' +
                '     ' + ctrl + 'p Pl33Z W8t... pR3calk1nG tAblez!!! ' + ctrl + 'q'
        );
        initTextScreen.Show();
        demoWindow.WaitVbl(200, crapOnScreen);

        function crapOnScreen() {
            var pause;
            var length = pauseTable.length;
            var pausePointer = 0;
            nextCrapStep();

            // Pause for a varying bit before next bit 
            // crap on screen...
            function nextCrapStep() {
                if (pausePointer < length) {
                    pause = pauseTable[pausePointer];
                    demoWindow.WaitVbl(pause, plotCrap);
                } else {
                    end();
                }
            }

            // Plot next bit of crap on screen...
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
        	placeholder.onkeydown = null;
            colonicIrrigation.next();
        }

        function plotPoint(colour) {
            context.fillStyle = colour;
            context.fillRect(x++, y, 1, 1);
            if (x > demoWidth) {
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
    * Water and text
    */
    function main() {
    	window.onkeypress = preEnd;
        var wait = ctrl + 'Y' + String.fromCharCode(32 + 20) + String.fromCharCode(32);
        var texts = [
            ' ',
            '    SeN1Or DadZ D00d 1T AgA1n!!!11',
            '         MeEGa KiLLa WaT3r FX!',
            '   Y00 a1nt SeEn Tha LAst of Us!!1',
            ' Tha MeGa <SeN1Or DadZ> RuLeC!!!11',
            ' ------++----++-_=_-_=++--+---=__==',
            ' < < < < SeeeeNiOR Gr33TZ 2: > > > ',
            ' 3V3ry 1 wh0 l1k3D 0uR c00l DeMo!!1',
            ' Da <AnAL TuCk> wAz 1n t0P 5 dEmOz!',
            'REEsP3kt 2 tH0s3 Wh0 v0T3d f0R uZz!',
            'M3Ga G1gA FuK 2 tH0z3 Wh0 dIdNt!!!1',
            'c00L 68oEo k0D3 bY 0Ld faRt!!!!!!11',
            'k1lla DZP k0D3 bY d0dD3r1Ng G1t!!11',
            'k1k1n zAxc bY dAmE v3Ra lYnN3!!!!!1',
            ' dIz d3M0 iZ iN PhAz3 40uR sT3r30!1',
            's00N k0MiNg fR0m s3Ni0R dAdz...>>..',
            '        th33 <<aIr>> d3M0!!!!!!1   ',
            '       th33 <<dIrT>> d3M0!!!1      ',
            '  HaV3 a t3kKn0 rAv3 2 dIz mUzAxC! ',
            '      DiZ iZz k00L!!!!!!!!!!!!!111 ',
            '      s3Ni0R dADz r00Lc!!!!!!111   ',
            'Hello, this Old Fart here typing on the keys,',
            'just the day after my Computing Science exam,',
            'and I must say that we have come up with yet',
            'another world-beater even if I say so myself.',
            'I first got the idea of a water effect in the',
            'the middle of doing one of the CSEM 1D Turbo' +
                wait +
                'Pascal projects (where you had to convert',
            'Pascal projects (where you had to convert',
            'Celsius temperatures into Farenheit) After',
            'discussing the idea with Doddering Git over',
            'a couple of pints in the Rolf Harris Bar of',
            'our student union, we worked out how to do ',
            'this amazing effect! Even better, we got our',
            'musician Dame Vera Lynn (Who regularly' +
                wait +
                "frequents the student union's 'Spotty'",
            "frequents the student union's 'Spotty'",
            '(BritPop/Indie/Ambient/Hardcore/Acid Jazz)' +
                wait +
                'club night) to do a thumping techno tune a la',
            'club night) to do a thumping techno tune a la',
            "Orb or Moby or whatever. (I'm more of a " +
                wait +
                'Supergrass man myself.)                 ',
            'Supergrass man myself.)                 ',
            'Neep, neep, wibble wibble, what shall I',
            'do for more sodding scrolltext. Spam, spam,'
        ];
        var demoDelay = 255;
        var length = texts.length - 1;
        var textPointer = 0;
        var textYstart = 20;
        var from = 0;
        var textY = textYstart;
        var textContext = water2Screen.context;
        var currentText;
        var lineLength = 24;
        var fromX = 0;
        var fromY = 0;
        var toX = 384 * 2 * lineLength;
        var toY = 240;
        var colr = 10;
        var isColr = true;
    	demoWidth = 384 - (8 * 3);
        water1Screen.Clear(black);
        water2Screen.Clear(black);
        currentDrawScreen = water2Screen;
        font.SetColours([0xff, 0xff, 0xff, 0xff], [0, 0, 0, 0xff]);
        music.play();
        water1Screen.Show();
        mainAnimDelay = setInterval(mainAnim, demoDelay);

        function mainAnim() {
            etchASketch();
            if (textY == textYstart) {
                if (textPointer > length) {
                    clearInterval(mainAnimDelay);
                    showText = true;
                    bomber.bombCanvas(water1Screen, 3);
                    bomber.bombCanvas(water2Screen, 3);
                    demoWindow.WaitVbl(70, end);
                } else {
                    textContext.fillStyle = black;
                    textContext.fillRect(0, 0, demoWidth, 8);
                    currentText = texts[textPointer++];
                    from = textY * 8;
                    font.PrintText(water2Screen, 0, textY, currentText);
                }
            } else {
                from = textY * 8;
                textContext.fillStyle = black;
                textContext.fillRect(0, from, demoWidth, 16);
                font.PrintText(water2Screen, 0, textY, currentText);
            }
            textY--;
            if (textY < 0) {
                textY = textYstart;
            }
            swapScreens();
        }


        function etchASketch() {
            var hello = 'Very nice Etch-A-Sketch Line rout!';
            drawLine(fromX, fromY, toX, toY, truColourToWebColour(black));
            toY--;
                if (toY > 0) {
                    colr++;
                    colr = colr % 0x1f;
                    if (colr < 8)
                        colr = 8;
                    drawLine(fromX, fromY, toX, toY, truColourToWebColour(colr));
                } else {
                    toY = 240;
                }

            function drawLine(x1, y1, x2, y2, lineColour) {
                var context = currentDrawScreen.context;
                context.fillStyle = lineColour;
                var doneX = false;
                var doneY = false;
                while (!(doneX && doneY)) {
                    if (!doneX) {
                        x1 += (x2 > x1) ? 1 : -1;
                        doneX = (x1 == x2);
                    }
                    if (!doneY) {
                        y1 += (y2 > y1) ? 1 : -1;
                        doneY = (y1 == y2);
                    }
                    context.fillRect(x1 % 384, ( y1 % 240 ) + (Math.floor(x1 / 384)), 1, 1);
                }
            }
        }
        
        function preEnd() {
            bomber.bombCanvas(water1Screen, 3);
            bomber.bombCanvas(water2Screen, 3);
            end();
        }
        
        function end() {
            clearInterval(mainAnimDelay);
            demoWindow.FlushWaitVbl();
            music.stop();
            colonicIrrigation.next();
        }
    }
    
    function mainAbort() {
        music.stop();
        clearInterval(mainAnimDelay);
        demoWindow.FlushWaitVbl();
    }

    function endCredits() {
    	samplePlayer.play();
    	window.onkeypress = end;
        var texts = [
            '           YOU HAVE BEEN WATCHING....        ',
            '',
            '*********************************************',
            '*                   THE                     *',
            '*                                           *',
            '*       (C) (O) (L) (O) (N) (I) (C)         *',
            '*  (I) (R) (R) (I) (G) (A) (T) (I) (O) (N)  *',
            '*                                           *',
            '*                  DEMO!                    *',
            '*                                           *',
            '*********************************************',
            '',
            'Featuring a WORLD FIRST!',
            '',
            '   A realtime WATER EFFECT!',
            '',
            '       THE ALL-IMPORTANT CREDITS:',
            '',
            '',
            'Original idea, main coding and design, Pascal',
            'modelling, scrolltext:                       ',
            '',
            '        O L D     F A R T                    ',
            '',
            '',
            'Optimisation, DSP routines (Using a          ',
            "revolutionary technique, we don't need to use",
            'an LOD file!!!!!!!), scrolltext:             ',
            '',
            '     D O D D E R I N G     G I T             ',
            '',
            '',
            'Our Special Senior Dads theme music, entitled',
            '"The Senior Dads Theme", GFX, scrolltext:    ',
            '',
            '     D A M E    V E R A    L Y N N           ',
            '',
            '',
            '=============================================',
            '',
            '   SPECIAL SENIOR DADS GREETINGS GO TO:',
            '',
            '   THE JOYEAUX LOOPHOCS: We think your new   ',
            ' "Stupid-o Demo" is really cool, and we' + "'re   ",
            ' taking notes!!!!!',
            '',
            '  EKO: You showed off a really good 3D engine',
            'at the Fried Place To Be 4! You may be the   ',
            'best now- but not for long!!!!! (Hint, hint!)',
            '',
            'LAZER: Well done for winning that demo compy!',
            "Just as well WE didn't enter the full demo   ",
            'competition, you would have been in trouble!!',
            '',
            'INTER: You were luckier than you thought,    ',
            'winning the 96k-tro competition, because     ',
            'judging from the reaction of the judges, we  ',
            'were obviously the most entertaining demo in ',
            'the competition!!!!',
            '',
            'WHOEVER DID THAT MODULE WHICH SOUNDED LIKE IT',
            'WAS CORRUPTED: Listen to our tunes, and see  ',
            'how you SHOULD be doing it!!!!',
            '',
            'DBA DISKMAG: We hope you like our ',
            'contribution to your realtime article. If you',
            'need any help in upgrading you Falcon',
            'interface, then contact us!',
            '',
            '=============================================',
            '',
            ' (c) Senior Dads 1995',
            '',
            '',
            '    SENIOR DADS INTERNET HEADQUARTERS        ',
            '',
            'http://grelb.src.gla.ac.uk:8000/             ',
            '                          mjames/senior/     ',
            '',
            '',
            '',
            ''];
        var scroll_count = 0;
        var scrollLines = texts.length - 1;
        var currentLinePointer = 0;
        var currentLine = "";
        var colour;
        var endBackgCanvas = document.createElement('canvas');
        endBackgCanvas.id = "SeniorDads.Demos.ColonicIrrigation.EndCredits";
        endBackgCanvas.width = 384;
        endBackgCanvas.height = 2;
        endBackgCanvas.style.visibility = 'hidden';
        var endBackgCanvasContext = endBackgCanvas.getContext('2d'); 
        var backgroundPointer = 0;
        var backgroundView = new DataView(endGfxBin);
        water1Screen.Hide();
        water2Screen.Show();
        water1Screen.context.drawImage(water2Screen.canvas, 0, 0, 384, 240);
        demoWindow.WaitVbl(2, endCreditsScroller);
			//alert(texts.length);
        //endDemo();
        
        function endCreditsScroller() {
            swapScreens();
            var sourceContext = displayedScreen.context;
            var drawContext = currentDrawScreen.context;
            drawContext.putImageData(sourceContext.getImageData(0, 2, 384 * 2, 238 * 2), 0, 0);
            var canvasData = drawContext.createImageData(384, 2);
            var canvasDataPosition = 0;
            for (var i = 0; i < (384 * 2); i++) {
                colour = truColourToCanvasColour(backgroundView.getUint16(backgroundPointer));
                backgroundPointer += 2;
                if (backgroundPointer > (65536*8))
                    backgroundPointer = 0;
                canvasData.data[canvasDataPosition++] = colour[0];
                canvasData.data[canvasDataPosition++] = colour[1];
                canvasData.data[canvasDataPosition++] = colour[2];
                canvasData.data[canvasDataPosition++] = colour[3];
            }
            endBackgCanvasContext.putImageData(canvasData, 0, 0);
            drawContext.drawImage(endBackgCanvas, 0, 238);
            scroll_count++;
            if (scroll_count == 16) {
                if (currentLinePointer > scrollLines) {
                    demoWindow.FlushWaitVbl();
                    demoWindow.WaitVbl(2, end);
                }
                currentLine = texts[currentLinePointer++];
                scroll_count = 0;
                font.PrintText(currentDrawScreen, 1, 29, currentLine);
            }
            demoWindow.WaitVbl(2, endCreditsScroller);
        }

        function truColourToCanvasColour(truColourVal) {
            //Value is in format: RRRRrGGGGGgBBBBb
            //& %1111100000000000 >> 8 = %RRRRR000 -> 0-0xff - 8
            //& %0000011111100000 >> 3 = %GGGGGG00 -> 0-0xff - 3
            //& %0000000000011111 << 3 = %BBBBB000 -> 0-0xff - 8
            var r = ((truColourVal & 63488) >> 8);
            var g = ((truColourVal & 2016) >> 3);
            var b = ((truColourVal & 31) << 3);
            return [r, g, b, 0xff];
        }
        
        function end() {
            demoWindow.FlushWaitVbl();
        	colonicIrrigation.next();
        }
    }
    
    function endCrash() {
        sampleWave = new RIFFWAVE();
        sampleWave.header.numChannels = 2;
        sampleWave.header.bitsPerSample = 8;
        sampleWave.header.sampleRate = 25*1024;
        var sampleLength = 65536*8;
        var sampleDataSrc = new Uint8Array(endGfxBin, 0, sampleLength);
        var sampleData = new Array();
        for (var i = 0; i<sampleLength; i++)
        	sampleData[i] = sampleDataSrc[i];
        sampleWave.Make(sampleData);
    	samplePlayer.pause();
        samplePlayer = new Audio(sampleWave.dataURI);
        samplePlayer.play();
		bomber.bombCanvas(displayedScreen, 14);
        demoWindow.WaitVbl(100, end);

        function end() {
            demoWindow.FlushWaitVbl();
        	colonicIrrigation.next();
        }
    }

    function endDemo() {
    	samplePlayer.pause();
        initTextScreen.Clear();
        initTextScreen.Show();
        water1Screen.Hide();
        water2Screen.Hide();
        if (callbackOnEnd != null)
            callbackOnEnd();
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

    function swapScreens() {
        displayedScreen = currentDrawScreen;
        if (currentDrawScreen == water2Screen)
            currentDrawScreen = water1Screen;
        else
            currentDrawScreen = water2Screen;
        currentDrawScreen.Hide();
        displayedScreen.Show();
    }
};