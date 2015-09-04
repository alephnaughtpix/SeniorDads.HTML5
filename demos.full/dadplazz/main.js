SeniorDads.CreateNameSpace("SeniorDads.Demos");

SeniorDads.Demos.DadPlazz = function(placeholder, name, callbackOnEnd) {
    this.blah = "dAdPlAz!";
    var demoWindow;
    this.Load = start;
    this.LoadAndStart = start;
    this.Start = start;
    this.Abort = abort;

    /* Main demo
     */    		
    function start() {
    	demoWindow = new SeniorDads.ScreenHandler(placeholder, name, 320, 240);
        var plazzScreen = demoWindow.add("dp", 2);
        var vblTimer = Math.floor( (Math.random() * 0xffff) + 1);
        var srcScreenPointer = 0;
        var destScreenPointer = srcScreenPointer + (320 * 4);
        var context = plazzScreen.context;
        var canvasData = context.createImageData(640, 240);
        var dataData = canvasData.data;
        plazzScreen.Show();
        plazzBlit();
        
        function plazzBlit() {
	        for (var i = (320*101); i > 0; i--) {
	        	var src = ( srcScreenPointer + i ) * 4;
	        	var mult = ( i * 4 ) * 4;
	        	var decMult = mult - (2 * 4);
	        	copyBit(src, src + mult);
	        	copyBit(src, src + decMult);
	        	copyBit(src, destScreenPointer + mult);
	        	copyBit(src, destScreenPointer + decMult);
	        	plotBit(vblTimer,src);
	        	i--;
	        }
	        context.putImageData(canvasData, 0, 0);
            context.drawImage(plazzScreen.canvas, 0, 0, 320, 480);
	        vblTimer++;
	        vblTimer = vblTimer & 0xffff;
	        demoWindow.WaitVbl(5, plazzBlit);
        }
        
        function copyBit(src, dest) {
        	dataData[dest++] = dataData[src++];
        	dataData[dest++] = dataData[src++];
        	dataData[dest++] = dataData[src++];
        	dataData[dest] = dataData[src];
        }
        
        function plotBit(truColourVal, dest) {
            dataData[dest++] = ((truColourVal & 63488) >> 8);
            dataData[dest++] = ((truColourVal & 2016) >> 3);
            dataData[dest++] = ((truColourVal & 31) << 3);
            dataData[dest] = 0xff;
        }
        
    }
    
    function abort() {
        demoWindow.FlushWaitVbl();
    }

};