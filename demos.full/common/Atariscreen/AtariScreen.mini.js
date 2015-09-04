function AtariScreen(M,N,O,z){function D(){var a=l.getContext("2d");w?(l.width=640,l.height=400,a.setTransform(1,0,0,1,0,0),a.scale(x,y),a.imageSmoothingEnabled=!1):(l.width=p,l.height=r);return a}function A(a){a="undefined"===typeof a?0:a;a=0>a||2<a?0:a;switch(a){case 0:n=4;y=x=2;p=320;r=200;q(new Uint16Array([4095,3840,240,4080,15,3855,255,1365,819,3891,1011,4083,831,3903,1023,0]));break;case 1:n=2;x=1;y=2;p=640;r=200;q(new Uint16Array([4095,3840,240,0]));break;case 2:y=x=n=1,p=640,r=400,q(new Uint16Array([0,
4095]))}var b=D();b.fillStyle=B[0];b.fillRect(0,0,p,r);return E=a}function F(){if(u){u=!1;var a=D(),b=a.createImageData(p,r),c=s.length/n,d=0,e=0,C,f,m,t,g,h=Array(n);for(C=0;C<c;C++){for(f=0;f<n;f++)h[f]=s[e++];for(f=15;-1<f;--f){t=0;g=1<<f;for(m=0;m<n;m++)h[m]&g&&(t+=1<<m);b.data[d++]=k[t][0];b.data[d++]=k[t][1];b.data[d++]=k[t][2];b.data[d++]=255}}a.putImageData(b,0,0);w&&a.drawImage(l,0,0);u=!0}return u}function q(a){var b=a.length;v=Array(b);B=Array(b);k=Array(b);g=Array(b);for(var c=0;c<b;c++)G(c,
a[c]);this.palette=v}function G(a,b){var c=(((b&1792)>>7)+((b&2048)>>11)).toString(16),d=(((b&112)>>3)+((b&128)>>7)).toString(16),e=(((b&7)<<1)+((b&8)>>3)).toString(16);v[a]=b;B[a]="#"+c+c+d+d+e+e;k[a]=[parseInt(c+c,16),parseInt(d+d,16),parseInt(e+e,16)]}function H(a,b){for(var c=v.length,d=new Uint16Array(c),e=0;e<c;e++)d[e]=a.getUint16(b),b+=2;q(d)}function I(a,b){for(var c=s.length,d=0;d<c;d++)s[d]=a.getUint16(b),b+=2;return b}function J(a,b){var c=160/n,d=c/2,e,g,f,m,k,h,l;e=new ArrayBuffer(160);
var p=new DataView(e),q=0;for(e=0;e<r;e++){for(g=m=0;g<n;g++)for(k=0;k<c;)if(h=a.getUint8(b++),0<(h&128))for(l=256-h+1,h=a.getUint8(b++),f=0;f<l;f++)p.setUint8(m++,h),k++;else for(h++,f=0;f<h;f++)p.setUint8(m++,a.getUint8(b++)),k++;for(g=m=0;g<d;g++){for(f=0;f<n;f++)s[q+f]=p.getUint16(m+f*c);m+=2;q+=n}}return b}function K(a){var b=!1;if(0<=a&&3>=a){var c=h[a];if(c.on){a=b=c.left_colour;var d=c.right_colour,e=c.position,e=e-c.direction;e>d&&(e=a);e<a&&(e=d);c.position=e;for(var c=c.length,l=0;l<c;l++)e>
d&&(e=b),k[a++]=[g[e][0],g[e][1],g[e++][2]];b=!0}}return b}function L(a){var b=-1;if(0<=a&&3>=a){var c=h[a];0!=c.direction&&(b=c.animationId=setInterval(function(){K(a);requestAnimationFrame(function(){F()})},c.delay),c.animating=!0)}return b}void 0===z&&(z=!0);var v,B,k,g,p,r,E,n,x,y,w=z,u=!0,s=new Uint16Array(16E3),h=[],l=N.appendChild(document.createElement("canvas"));l.id=O;l.width=640;l.height=400;this.width=function(){return p};this.height=function(){return r};this.planes=function(){return n};
this.mode=function(){return E};this.ready=function(){return u};this.palette=v;this.screen_memory=s;this.cycles=h;Object.defineProperty(this,"scale",{get:function(){return w},set:function(a){w=a}});this.SetMode=A;this.Display=F;this.SetPalette=q;this.SetPaletteValue=G;this.ExtractDegasElite=function(a){var b=new DataView(a),c=b.getUint16(0);A(c&255);H(b,2);c=0<(c&32768)?J(b,34):I(b,34);if(32==a.byteLength-c){h=[];for(a=0;4>a;a++){var d={};d.left_colour=b.getUint16(c+2*a);d.right_colour=b.getUint16(c+
2*a+8);d.direction=b.getUint16(c+2*a+16)-1;d.delay=Math.round(1E3*(128-b.getUint16(c+2*a+24))/60);d.position=0;d.length=d.right_colour-d.left_colour+1;d.on=!1;d.animating=!1;h.push(d)}this.cycles=h}};this.ExtractPalette=H;this.ExtractPlanarScreen=I;this.ExtractRLEData=J;this.StartCycle=function(a,b){void 0===b&&(b=!1);var c=!1;if(0<=a&&3>=a){var d=h[a];if(0!=d.direction){c=k.length;g=Array(c);for(var e=0;e<c;e++)g[e]=[k[e][0],k[e][1],k[e][2]];d.position=0;d.length=d.right_colour-d.left_colour+1;d.on=
!0;b&&L(a);c=!0}}return c};this.GetNextCycle=K;this.StartCycleAnimation=L;this.StopCycle=function(a){var b=!1;if(0<=a&&3>=a&&(a=h[a],a.on)){a.animating&&clearInterval(a.animationId);a.animating=!1;b=g.length;k=Array(b);for(var c=0;c<b;c++)k[c]=[g[c][0],g[c][1],g[c][2]];a.on=!1;b=!0}return b};A(M)};