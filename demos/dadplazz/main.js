SeniorDads.CreateNameSpace("SeniorDads.Demos");SeniorDads.Demos.DadPlazz=function(r,s,u){this.blah="dAdPlAz!";function t(){function l(){for(var c=32320;0<c;c--){var a=4*(m+c),d=16*c,n=d-8;e(a,a+d);e(a,a+n);e(a,p+d);e(a,p+n);d=f;b[a++]=(d&63488)>>8;b[a++]=(d&2016)>>3;b[a++]=(d&31)<<3;b[a]=255;c--}h.putImageData(q,0,0);h.drawImage(k.canvas(),0,0,320,480);f++;f&=65535;g.WaitVbl(5,l)}function e(c,a){b[a++]=b[c++];b[a++]=b[c++];b[a++]=b[c++];b[a]=b[c]}g=new SeniorDads.ScreenHandler(r,s,320,240);var k=g.add("dp",2),f=Math.floor(65535*Math.random()+1),m=0,p=m+1280,h=k.context(),
q=h.createImageData(640,240),b=q.data;k.Show();l()}var g;this.Start=this.LoadAndStart=this.Load=t;this.Abort=function(){g.FlushWaitVbl()}};