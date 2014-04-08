SeniorDads.CreateNameSpace("SeniorDads.Font");

SeniorDads.Font.Tos = function (url, graphicsMode) {
    if (graphicsMode === undefined) graphicsMode = 0;
    var fontData, fontBuffer, width, height, x, y, loader;
    var foreground = [0, 0, 0, 0xff];
    var background = [0xff, 0xff, 0xff, 0xff];
    var loaded = false;
    var characterCanvas = document.createElement('canvas');
    characterCanvas.id = "SeniorDads.Font.Tos.Store";
    characterCanvas.width = 8;
    characterCanvas.height = 8;
    characterCanvas.style.visibility = 'hidden';
    var charCanvasContext = characterCanvas.getContext('2d');
    setTextMode(graphicsMode);
    LoadFont(url);

    this.width = function () { return width; };
    this.height = function () { return height; };
    this.loaded = function () { return loaded; };
    this.SetTextMode = setTextMode;
    this.SetColours = setColours;
    this.PrintText = printText;

    function LoadFont(fontUrl) {
        loader = new SeniorDads.Loader.LoadBinary(fontUrl, fontData, processFont);
        return fontData;
    }

    function processFont(buffer) {
        fontData = buffer;
        fontBuffer = new Object;
        var ascii_start = " ".charCodeAt(0);
        var ascii_end = "~".charCodeAt(0) - 1;
        var fontDataView = new DataView(fontData);
        var fontDataPointer = 0;
        var currentChar;
        for (var i = ascii_start; i <= ascii_end; i++) {
            currentChar = String.fromCharCode(i);
            fontBuffer[currentChar] = new Array(8 * 8);
            for (var j = 0; j < 8; j++) {
                var currentCharLine = fontDataView.getUint8(fontDataPointer++);
                for (var k = (8 - 1); k > -1; --k)
                    fontBuffer[currentChar][(j * 8) + (8 - k)] = ((currentCharLine & (1 << k)) > 0);
            }
        }
        loaded = true;
    }

    function setTextMode(setGraphicsMode) {
        setGraphicsMode = (typeof setGraphicsMode === "undefined") ? 0 : setGraphicsMode;
        setGraphicsMode = ((0 > setGraphicsMode) || (setGraphicsMode > 1)) ? 0 : setGraphicsMode;
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

    function setColours(myForeground, myBackground) {
        foreground = myForeground;
        background = myBackground;
    }

    function printText(screen, px, py, text) {
        var context = screen.context();
        var ctrl = String.fromCharCode(27);
        var lines = text.split('\n');
        var linecount = lines.length;
        var gfxX = px * 8;
        var gfxY = py * 8;
        var h, i, j, length, charBuffer, canvasDataPosition, charBufferPointer, colour, currentLine;
        for (h = 0; h < linecount; h++) {
            currentLine = lines[h];
            length = currentLine.length;
            for (i = 0; i < length; i++) {
                if (currentLine.charAt(i) == ctrl) {
                    i++;
                    switch (currentLine.charAt(i++)) {
                    case "p":
                        invertTextColours();
                        break;
                    case "q":
                        invertTextColours();
                        break;
                    case "Y":
                        py = currentLine.charCodeAt(i++) - 32;
                        px = currentLine.charCodeAt(i++) - 32;
                        gfxX = px * 8;
                        gfxY = py * 8;
                        break;
                    }
                    i--;
                } else {
                    charBuffer = fontBuffer[currentLine.charAt(i)];
                    var canvasData = context.createImageData(8, 8);
                    canvasDataPosition = 0;
                    charBufferPointer = 0;
                    for (j = 0; j < (8 * 8); j++) {
                        colour = (charBuffer[charBufferPointer++]) ? foreground : background;
                        canvasData.data[canvasDataPosition++] = colour[0];
                        canvasData.data[canvasDataPosition++] = colour[1];
                        canvasData.data[canvasDataPosition++] = colour[2];
                        canvasData.data[canvasDataPosition++] = colour[3];
                    }
                    charCanvasContext.putImageData(canvasData, 0, 0);
                    context.drawImage(characterCanvas, gfxX, gfxY);
                    gfxX += 8;
                    px++;
                }
            }
            gfxY += 8;
            py++;
            gfxX = 0;
            px = 0;
        }
        x = px;
        y = py;
    }

    function invertTextColours() {
        var temp = foreground;
        foreground = background;
        background = temp;
    }
};