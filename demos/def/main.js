SeniorDads.CreateNameSpace("SeniorDads.Demos");
SeniorDads.Demos.DefDemo=function(L,n,M){this.blah="y333Ah!!! w3:R3 bAcK!!!!!1!!1! tH3 m3GaM1gHt33 *s3N10r dAdZ* rUl3c!!!!! IN CODEF!!!!!!";function Pa(){u=0;a.loop=!1;t.style.opacity="0";t.style.cursor="default";t.removeEventListener("mousedown",A);t.removeEventListener("touchend",A);oa.stop();l.next()}function Qa(){B.stop();l.next()}function Y(h,k){return Math.floor(Math.random()*(k-h-1))+h}function Ha(h,k){return void 0===h?k:null==h?k:h}function f(h){return Ha(h,!1)}function Ra(h,k,a){f(h)?(r.show(),k=h.animate?5<k?k-20:0:0,h.wobble?m[h.name].drawPart(r,O.h(),O.v()+k,1,0,645,405):m[h.name].drawPart(r,
0,k,1,0,640,400),a=!1):(r.hide(),a||(r.clear(),a=!0),k=405);h={};h.backDropY=k;h.backdropCleared=a;return h}function A(a){l.currentPart().abort()}void 0===M&&(M=null);var l,C,Z,e,H,aa,D,Sa,ba,oa,B,Ta,E,P,Q,Ia,v,R,Ua,Va,Wa,Xa,Ja,ca,S,Ya,pa,I,F,T,U,N,J,V,Za,$a,ab,m,r,O,da,bb,qa,W,ea,cb,db,eb,fb,gb,hb,b,ra,fa,sa,Ka,w,d,c,ga,ha,La,Ma,x,ia,a,t,Na,ib,G,Oa,u=0,g=1,p=Array(128),jb=null;l=new SeniorDads.Demos.Demo(null,
function(a){void 0!==a&&(jb=a);C=new SeniorDads.ScreenHandler(L,n,640,400);oa=new SeniorDads.Music("MOD",DEMO_ROOT+"/def/resources/sashy_fanfare.bin",!0);B=new SeniorDads.Music("YM",DEMO_ROOT+"/def/resources/rasero_ym.bin",!1);ib=new SeniorDads.Loader.Binary(DEMO_ROOT+"/def/resources/colend.bin",Na,function(a){Na=a});new SeniorDads.Loader([oa,B,new SeniorDads.Image(DEMO_ROOT+"/def/resources/senior.png"),new SeniorDads.Image(DEMO_ROOT+"/common/resources/largeFont.png"),new SeniorDads.Image(DEMO_ROOT+
"/def/resources/dad_logo.gif"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/logo.gif"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/title_def.png"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/title_demo.png"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/disk2.gif"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/disk3.gif"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/disk4.gif"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/netbest_back.jpg"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/sad_back3.jpg"),
new SeniorDads.Image(DEMO_ROOT+"/def/resources/sad_back.gif"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/feat_back.jpg"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/ptrail_bkg.gif"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/oldfart.jpg"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/dodgit.jpg"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/damevera.jpg"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/jpollock.jpg"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/colostomy.gif"),new SeniorDads.Image(DEMO_ROOT+
"/def/resources/trump.png"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/atari.gif"),new SeniorDads.Image(DEMO_ROOT+"/def/resources/phase4.gif"),ib],jb,null)},function(){function a(k,b){for(var h=grad,d=[],c=1/(b.length-1),f=0,e=0;e<b.length;e++)d.push({color:b[e],offset:f}),f+=c;return new h(k,d)}Ta=new image(DEMO_ROOT+"/def/resources/senior.png");Z=SeniorDads.ScreenHandler.Codef(640,400,n,g++);Ta.draw(Z,0,0);(function(){m={};for(var a=/resources\/(\w+)\.\w+/i,b="resources/netbest_back.jpg resources/sad_back3.jpg resources/sad_back.gif resources/feat_back.jpg resources/ptrail_bkg.gif resources/trump.png".split(" "),
h=0;h<b.length;h++){var d=new canvas(650,410),f=new image(DEMO_ROOT+"/def/"+b[h]),c=b[h].replace(a,"$1");if(650>=f.img.width||410>=f.img.width)for(var e=y=0;410>y;){for(;650>e;)f.draw(d,e,y),e+=f.img.width;e=0;y+=f.img.height}m[c]=d}m.presents=Z;r=SeniorDads.ScreenHandler.Codef(640,400,n,g++);O=new SeniorDads.Wobbler([{value:0,amp:5,inc:.3},{value:.5,amp:5,inc:.3}],[{value:.5,amp:3,inc:.2},{value:0,amp:2,inc:.1}])})();Ka=new canvas(1,480);w=SeniorDads.ScreenHandler.Codef(640,400,n,g++);a(Ka,"#000000 #000000 #ff8800 #000000 #000000 #44ff88 #000000 #000000 #4488ff #000000 #000000 #ff88c8 #000000 #000000".split(" ")).drawH();
N=SeniorDads.ScreenHandler.Codef(640,60,n,g++);J=SeniorDads.ScreenHandler.Codef(640,60,n,g++);V=SeniorDads.ScreenHandler.Codef(640,60,n,g++);a(N,["#000000","#ff8844","#ffffff","#ff8844","#000000"]).drawH();a(J,["#000000","#44ff88","#ffffff","#44ff88","#000000"]).drawH();a(V,["#000000","#8844ff","#ffffff","#8844ff","#000000"]).drawH();N.x=J.x=J.x=0;Za=new SeniorDads.Wobbler([{value:0,amp:10,inc:.3},{value:.5,amp:6,inc:.4}]);$a=new SeniorDads.Wobbler([{value:0,amp:10,inc:.25},{value:.5,amp:6,inc:.35}]);
ab=new SeniorDads.Wobbler([{value:0,amp:10,inc:.2},{value:.5,amp:6,inc:.4}]);ca=SeniorDads.ScreenHandler.Codef(640,200,n,g++);S=SeniorDads.ScreenHandler.Codef(640,200,n,g++);a(ca,["#FFCC55","rgba(0,0,0,0)"]).drawH();a(S,["rgba(0,0,0,0)","#FFCC55"]).drawH();S.y=200;e=SeniorDads.ScreenHandler.Codef(640,400,n,g++);e.contex.imageSmoothingEnabled=!1;e.contex.mozImageSmoothingEnabled=!1;e.contex.oImageSmoothingEnabled=!1;Ya=new starfield2D_dot(e,[{nb:66,speedy:0,speedx:-3.9,color:"#ffffff",size:2},{nb:66,
speedy:0,speedx:-2.8,color:"#888888",size:2},{nb:66,speedy:0,speedx:-1.7,color:"#444444",size:2}]);I=new image(DEMO_ROOT+"/def/resources/title_def.png");F=new image(DEMO_ROOT+"/def/resources/title_demo.png");T=SeniorDads.ScreenHandler.Codef(I.img.width,I.img.height,n,g++,0,200-I.img.height/2);T.hide();I.draw(T,0,0);U=SeniorDads.ScreenHandler.Codef(F.img.width,F.img.height,n,g++,640-F.img.width,200-F.img.height/2);U.hide();F.draw(U,0,0);P=new image(DEMO_ROOT+"/def/resources/logo.gif");Q=SeniorDads.ScreenHandler.Codef(P.img.width,
P.img.height,n,g++,320-P.img.width/2,20);Q.hide();P.draw(Q,0,0);Ia=new SeniorDads.Wobbler([{value:0,amp:3,inc:.3},{value:.5,amp:3,inc:.4}],[{value:.5,amp:3,inc:.2},{value:0,amp:2,inc:.1}]);(function(){qa={};bb=new image(DEMO_ROOT+"/def/resources/phase4.gif");da=new image(DEMO_ROOT+"/def/resources/atari.gif");for(var a=0,b=0;8>b;b++)qa[b]=new SeniorDads.Wobbler([{value:a,amp:240,inc:.08},{value:a,amp:20,inc:.3}],[{value:a,amp:120,inc:.06},{value:a,amp:20,inc:.4}]),a+=.3})();(function(){E=new image(DEMO_ROOT+
"/common/resources/largeFont.png");E.initTile(32,16,32);H=new canvas(640,140);aa=new canvas(640,32);D=new canvas(640,1120);var b=new canvas(640,160);ba=new scrolltext_horizontal;Va=[{value:0,amp:20,inc:.03,offset:-.05},{value:0,amp:35,inc:.01,offset:-.04}];ba.scrtxt=".   .  . . ...... YEEEEEAAAHH!!!! THE DADS ARE BACK!!!!^P2 WITH A NEW CODEF-TRO CALLED... . .  .                         ^P7RELEASED 29 AUG 2015!^P3!!!!! Rejoice!!!!! ^P2 If u think this is YouTube, your so wrong!!!! This detnro is happening now on your browsey-wowsey!!!!!!! Ja!!!! Dis CODEC is CODED by our CODEEs in CODEF!!!!!       And Javascript, obviously.            CREDITS!!!!!     Code(f!!) by OLD FART & DODDERING GIT!!!     Art by JACKSON POLLOCK!!!!    DJ MusixMix by DAME VERA LYN!!!!!   .   .  . . ...... Welcome to our first demo of the millenium!!!! We wanted to do an Atari prod for our 20th Anniversary!! Then we saw someone did an Atari demo on a webpage!!!! So we thot: 'Hay!!! Let's do that!!!!'!! So we toiled for yonks to learn tha CODEF, and here are our first fruits of our labour!!!!! This CODEF/JS/HTML5 malarkey was a bit funy at first- like doing a fullscreen in Turbo Pascal!!!! In fact, you can't even do fullscreen by flipping to 60Hz like on the old Atarri!!!!! If you havent seen our Atari demoes (Where you been!!!), get thee to our w3sitey at seniordads.atari.org ^P3!!!!!!! and you can run them in Atari emulators!!!        And soon- IN HTML5!!!!!!!!!^P2      This is just a simple demo of wot we can do in 'def- nearly all the GFX is old stuff by Jackson Pollock for our website, and the DJ mix was done by Dame Vera Lynn at the Reservoir Gods Cwmvention in 1997!!!!    Our next newie will contain all new GFX, Zix, and FX!!!!!!         So watch out!!!!!!!      THE SENIOR DADS!! If it's too old, you're loud!!!!!!!!!!          Go on, press space bar, you div!!!!!!        ";
Wa=new FX(aa,H,Va);ba.init(aa,E,5);a(b,"#000000 #00FFFF #FF0000 #00FF00 #FF00FF #FFFF00 #0000FF #000000".split(" ")).drawH();b.draw(D,0,0);a(b,"#000000 #FF4422 #4422FF #FF4422 #4422FF #FF4422 #000000".split(" ")).drawH();b.draw(D,0,160);m.ptrail_bkg.drawPart(D,0,320,0,50,640,160);a(b,"#000000 #FFFF66 #00FF00 #FFFF66 #FF0000 #FFFF66 #0088FF #FFFF66 #000000".split(" ")).drawH();b.draw(D,0,480);a(b,"#000000 #ffffff #44FF88 #ffffff #FF4488 #ffffff #4488FF #ffffff #000000".split(" ")).drawH();b.draw(D,
0,640);m.trump.drawPart(D,0,800,0,50,640,160);m.presents.drawPart(D,0,960,0,50,640,160);Sa=new SeniorDads.Wobbler([{value:0,amp:3,inc:.3},{value:.5,amp:3,inc:.4}])})();(function(){Xa=new image(DEMO_ROOT+"/def/resources/disk3.gif");Ja=new canvas(34,37);Xa.draw(Ja,0,0);for(var a=0;a<p.length;a++)p[a]={x:Y(-25,25),y:Y(-25,25),z:Y(1,32)}})();v=new image(DEMO_ROOT+"/def/resources/dad_logo.gif");R=new canvas(v.img.width,v.img.height);v.draw(R,0,0);Ua=new FX(R,e,[{value:0,amp:10,inc:.03,offset:-.05},{value:0,
amp:10,inc:.01,offset:.08}]);pa=new canvas(1280,2);a(pa,"#000000 #00FFFF #FF0000 #00FF00 #FF00FF #FFFF00 #0000FF #000000 #00FFFF #FF0000 #00FF00 #FF00FF #FFFF00 #0000FF #000000".split(" ")).drawV();W={};W=[{x:-100,y:100,z:100},{x:-100,y:-100,z:100},{x:100,y:-100,z:100},{x:100,y:100,z:100},{x:100,y:100,z:-100},{x:100,y:-100,z:-100},{x:-100,y:-100,z:-100},{x:-100,y:100,z:-100}];cb=new image(DEMO_ROOT+"/def/resources/oldfart.jpg");db=new image(DEMO_ROOT+"/def/resources/dodgit.jpg");eb=new image(DEMO_ROOT+
"/def/resources/damevera.jpg");fb=new image(DEMO_ROOT+"/def/resources/jpollock.jpg");gb=new image(DEMO_ROOT+"/def/resources/colostomy.gif");hb=new image(DEMO_ROOT+"/def/resources/sad_back.gif");ea={};ea=[{p1:0,p2:1,p3:2,p4:3,u1:0,v1:0,u2:0,v2:1,u3:.52,v3:1,u4:.52,v4:0,params:new MeshBasicMaterial({map:new Texture(cb.img)})},{p1:3,p2:2,p3:5,p4:4,u1:0,v1:0,u2:0,v2:1,u3:.52,v3:1,u4:.52,v4:0,params:new MeshBasicMaterial({map:new Texture(db.img)})},{p1:7,p2:6,p3:1,p4:0,u1:0,v1:0,u2:0,v2:1,u3:.52,v3:1,
u4:.52,v4:0,params:new MeshBasicMaterial({map:new Texture(eb.img)})},{p1:7,p2:0,p3:3,p4:4,u1:0,v1:0,u2:0,v2:1,u3:.52,v3:1,u4:.52,v4:0,params:new MeshBasicMaterial({map:new Texture(fb.img)})},{p1:1,p2:6,p3:5,p4:2,u1:0,v1:0,u2:0,v2:1,u3:.52,v3:1,u4:.52,v4:0,params:new MeshBasicMaterial({map:new Texture(gb.img)})},{p1:4,p2:5,p3:6,p4:7,u1:0,v1:0,u2:0,v2:.8,u3:1,v3:.8,u4:1,v4:0,params:new MeshBasicMaterial({map:new Texture(hb.img)})}];b=new codef3D(e,900,40,1,1600);b.faces4(W,ea,!1,!0);ra=new SeniorDads.Wobbler([{value:0,
amp:240,inc:.08},{value:.5,amp:20,inc:.3}],[{value:0,amp:120,inc:.06},{value:.5,amp:20,inc:.4}],[{value:0,amp:200,inc:.07}]);fa=new SeniorDads.Wobbler([{value:0,amp:5,inc:.2},{value:.5,amp:10,inc:.3}],[{value:0,amp:10,inc:.3},{value:.5,amp:5,inc:.4}]);sa=new SeniorDads.Wobbler([{value:0,amp:1,inc:.2},{value:.5,amp:.5,inc:.3}],[{value:0,amp:1,inc:.3},{value:.5,amp:.5,inc:.4}],[{value:0,amp:1,inc:.35},{value:.5,amp:.5,inc:.45}]);ga=[];ga[0]=new image(DEMO_ROOT+"/def/resources/disk2.gif");d=new codef3D(e,
900,35,1,1600);d.vectorball_img([{x:-1,y:-2,z:0,img:0},{x:0,y:-2,z:0,img:0},{x:1,y:-2,z:0,img:0},{x:2,y:-2,z:0,img:0},{x:2,y:-1,z:0,img:0},{x:-1,y:0,z:0,img:0},{x:0,y:0,z:0,img:0},{x:1,y:0,z:0,img:0},{x:-2,y:1,z:0,img:0},{x:-2,y:2,z:0,img:0},{x:-1,y:2,z:0,img:0},{x:0,y:2,z:0,img:0},{x:1,y:2,z:0,img:0}],ga);d.group.scale.x=d.group.scale.y=d.group.scale.z=60;d.group.position.x=-240;ha=[];ha[0]=new image(DEMO_ROOT+"/def/resources/disk4.gif");c=new codef3D(e,900,35,1,1600);c.vectorball_img([{x:-2,y:-2,
z:0,img:0},{x:-1,y:-2,z:0,img:0},{x:0,y:-2,z:0,img:0},{x:1,y:-2,z:0,img:0},{x:-2,y:-1,z:0,img:0},{x:2,y:-1,z:0,img:0},{x:-2,y:0,z:0,img:0},{x:2,y:0,z:0,img:0},{x:-2,y:1,z:0,img:0},{x:2,y:1,z:0,img:0},{x:-2,y:2,z:0,img:0},{x:-1,y:2,z:0,img:0},{x:0,y:2,z:0,img:0},{x:1,y:2,z:0,img:0}],ha);c.group.scale.x=c.group.scale.y=c.group.scale.z=60;c.group.position.x=240;La=new SeniorDads.Wobbler([{value:0,amp:5,inc:.2},{value:.5,amp:10,inc:.3}],[{value:0,amp:10,inc:.3},{value:.5,amp:5,inc:.4}]);Ma=new SeniorDads.Wobbler([{value:0,
amp:5,inc:.3},{value:.5,amp:10,inc:.2}],[{value:0,amp:10,inc:.4},{value:.5,amp:5,inc:.3}]);vectorDiskSWibble=new SeniorDads.Wobbler([{value:0,amp:.2,inc:.2},{value:.5,amp:.1,inc:.3}],[{value:0,amp:.1,inc:.3},{value:.5,amp:.2,inc:.4}],[{value:0,amp:.1,inc:.35},{value:.5,amp:.2,inc:.45}]);vectorDiskDWibble=new SeniorDads.Wobbler([{value:0,amp:.2,inc:-.2},{value:.5,amp:.1,inc:-.3}],[{value:0,amp:.1,inc:-.3},{value:.5,amp:.2,inc:-.4}],[{value:0,amp:.1,inc:-.35},{value:.5,amp:.2,inc:-.45}]);L.parentNode.appendChild(document.createElement("style")).innerHTML=
"#SpaceBar {color:#000000;text-align:center;margin-left:auto; margin-right:auto; border:none; width: 640px; background-color: #ff6688; font-family: Courier, sans-serif; font-size: 14px; font-weight:bold; cursor: pointer; text-transform:uppercase;}";t=L.parentNode.appendChild(document.createElement("div"));t.type="button";t.innerHTML="Press the any key for the Credits Screen!!!!!!";t.id="SpaceBar";t.style.opacity="0";t.addEventListener("mousedown",A);t.addEventListener("touchend",A)},function(){w.fill("#ffffff")},
M);l.add(new SeniorDads.Demos.Demo.DemoPart(null,function(){function h(){Ha(a.main,!0)?(e.clear(),e.show()):e.hide();f(a.presents)?Z.show():Z.hide();var d=Ra(a.backdrop,G,I);G=d.backDropY;I=d.backdropCleared;if(f(a.coppers)){for(var c=d=0;20>c;c++)d++,10<d&&d++,Ka.drawPart(w,0,20*c,0,d+ja,1,20,1,0,640,1);w.show();ja++;400<ja&&(ja=0)}else ja=0,w.hide();if(f(a.sprites))for(f(a.sprites.bob)&&ka!=a.sprites.bob&&(ka=a.sprites.bob),d=0;8>d;d++){var c=qa[d].h()+(640-ka.img.width)/2,k=qa[d].v()+(400-ka.img.height)/
2;ka.draw(e,c,k)}ca.hide();S.hide();f(a.backGrad)&&(f(a.backGrad.top)&&ca.show(),f(a.backGrad.bottom)&&S.show());f(a.starfield)&&Ya.draw();T.hide();U.hide();f(a.title)&&(a.title.def&&T.show(),a.title.demo&&U.show());if(f(a.diskfield))for(d=p.length,c=0;c<d;c++){p[c].z-=.2;0>=p[c].z&&(p[c].x=Y(-25,25),p[c].y=Y(-25,25),p[c].z=32);var g=128/p[c].z,k=p[c].x*g+320,g=p[c].y*g+240;if(0<=k&&640>=k&&0<=g&&480>=g){var q=5*(1-p[c].z/32)/8,l=parseInt(255*(1-p[c].z/32))/255;Ja.draw(e,k,g,l,0,q,q)}}n();f(a.disty)&&
(a.disty.animate?Ua.sinx(320-v.img.width/2,20):v.draw(e,320-v.img.width/2,20));f(a.logo)?(d=320-P.img.width/2,a.logo.animate?(la=280-Math.abs(260*Math.sin(ua)),ua+=.025):(la=20,ua=1.8),a.logo.wobble&&(d+=Ia.h(),la+=Ia.v()),Q.draw(e,d,la)):Q.hide();f(a.rasterBar)?(N.show(),J.show(),V.show(),X=330-Math.abs(200*Math.sin(C)),A=330-Math.abs(200*Math.sin(E)),B=330-Math.abs(200*Math.sin(L)),a.rasterBar.wobble&&(X+=Za.h(),A+=$a.h(),B+=ab.h()),C+=.05,E+=.05,L+=.05,N.y=X,J.y=A,V.y=B):(N.hide(),J.hide(),V.hide());
f(a.cube)&&(f(a.cube.hold)?(0==va&&(va=b.group.position.x,M=b.group.position.y,O=b.group.rotation.x,R=b.group.rotation.y,W=b.group.rotation.z),a.cube.hold.rot&&(b.group.rotation.x=O+sa.h(),b.group.rotation.y=R+sa.v(),b.group.rotation.z=W+sa.z()),a.cube.hold.bye?(b.group.position.x-=10+fa.h(),b.group.position.y-=10+fa.v(),b.group.position.z-=20):(b.group.position.x=va+fa.h(),b.group.position.y=M+fa.v())):(b.group.rotation.x+=.01,b.group.rotation.y+=.02,b.group.rotation.z+=.04,b.group.position.x=ra.h(),
b.group.position.y=ra.v(),b.group.position.z=ra.z(),M=va=0),b.draw());f(a.colourBar)&&(a.colourBar.top&&(pa.draw(e,ma,11),ma+=2,0<=ma&&(ma=-640)),a.colourBar.bottom&&(pa.draw(e,na,391),na-=2,-640>=na&&(na=0)));f(a.scroller)&&(aa.clear(),H.clear(),ba.draw(0),Wa.siny(0,55),H.contex.globalCompositeOperation="source-atop",D.drawPart(H,0,0,0,z+Sa.h(),640,160),H.draw(e,0,260),H.contex.globalCompositeOperation="source-over",f(a.scroller.back)&&(wa=160*(a.scroller.back-1)+10),z!=wa&&(z<wa&&(z+=5),z>wa&&(z-=
5)));a.spacebar&&1>xa&&(xa+=.025,t.style.opacity=xa);(F=Ha(a.loop,!0))&&requestAnimFrame(h)}function k(){u+1<q.length||(ba.scroffset=0,aa.clear(),H.clear(),z=10,u=0);SeniorDads.Music.SetBreakPoint(q[u+1].trackPos,q[u+1].patternPos,l)}function l(){u++;a=q[u].layers;u==q.length&&(u=0);k();F||requestAnimFrame(h)}function n(){function b(a){0>a&&(a+=.04);0<a&&(a-=.04);return a}f(a.vectaDisk)&&(f(a.vectaDisk.wibble)?(ya=b(ya),za=b(za),Aa=b(Aa),Ba=b(Ba),Ca=b(Ca),Da=b(Da),d.group.rotation.x=ya+vectorDiskSWibble.h(),
d.group.rotation.y=za+vectorDiskSWibble.v(),d.group.rotation.z=Aa+vectorDiskSWibble.z(),c.group.rotation.x=Ba+vectorDiskDWibble.h(),c.group.rotation.y=Ca+vectorDiskDWibble.v(),c.group.rotation.z=Da+vectorDiskDWibble.z()):(d.group.rotation.x+=.01,d.group.rotation.y+=.02,d.group.rotation.z+=.04,c.group.rotation.x-=.01,c.group.rotation.y-=.02,c.group.rotation.z-=.04,ya=d.group.rotation.x,za=d.group.rotation.y,Aa=d.group.rotation.z,Ba=c.group.rotation.x,Ca=c.group.rotation.y,Da=c.group.rotation.z),d.group.position.x=
ea+La.h(),d.group.position.y=ga+La.v(),d.draw(),c.group.position.x=ha+Ma.h(),c.group.position.y=ia+Ma.v(),c.draw())}var g={scroller:!0,starfield:!0,title:{def:!0,demo:!1},disty:{animate:!0},colourBar:{top:!0,bottom:!0}},K={scroller:!0,starfield:!0,title:{def:!1,demo:!0},disty:{animate:!0},colourBar:{top:!0,bottom:!0}},m={scroller:!0,starfield:!0,disty:{animate:!1},colourBar:{top:!0,bottom:!0},cube:{hold:!1}},ta={backdrop:{name:"trump",wobble:!0,animate:!1},scroller:!0},x={scroller:!0,starfield:!0,
disty:{animate:!1},colourBar:{top:!0,bottom:!0},cube:{hold:{on:!0,rot:!1,bye:!1}}},Ea={scroller:{back:1},disty:{animate:!1},backGrad:{top:!1,bottom:!0},title:{def:!0,demo:!1},diskfield:!0},r={scroller:!0,disty:{animate:!1},backGrad:{top:!1,bottom:!0},title:{def:!1,demo:!0},diskfield:!0},Fa={scroller:!0,disty:{animate:!1},backGrad:{top:!1,bottom:!0},title:{def:!0,demo:!1},sprites:{bob:da},diskfield:!0},Ga={scroller:!0,disty:{animate:!1},backGrad:{top:!1,bottom:!0},title:{def:!1,demo:!0},sprites:{bob:da},
diskfield:!0},q=[{trackPos:0,patternPos:0,layers:{presents:!0,loop:!1}},{trackPos:1,patternPos:0,layers:{presents:!0,logo:{animate:!1,wobble:!1},loop:!1}},{trackPos:2,patternPos:0,layers:{presents:!0,logo:{animate:!1,wobble:!0}}},{trackPos:3,patternPos:0,layers:{presents:!0,logo:{animate:!0,wobble:!0}}},{trackPos:3,patternPos:64,layers:{presents:!0,scroller:{back:1},logo:{animate:!0,wobble:!0}}},{trackPos:5,patternPos:224,layers:{scroller:!0,disty:{animate:!1},logo:{animate:!1,wobble:!0}}},{trackPos:7,
patternPos:0,layers:g},{trackPos:7,patternPos:32,layers:K},{trackPos:7,patternPos:64,layers:g},{trackPos:7,patternPos:96,layers:K},{trackPos:7,patternPos:128,layers:g},{trackPos:7,patternPos:160,layers:K},{trackPos:7,patternPos:192,layers:g},{trackPos:7,patternPos:224,layers:K},{trackPos:8,patternPos:0,layers:g},{trackPos:8,patternPos:32,layers:K},{trackPos:8,patternPos:64,layers:g},{trackPos:8,patternPos:96,layers:K},{trackPos:8,patternPos:128,layers:g},{trackPos:8,patternPos:160,layers:K},{trackPos:8,
patternPos:192,layers:g},{trackPos:8,patternPos:224,layers:K},{trackPos:9,patternPos:0,layers:{scroller:{back:2},title:{def:!0,demo:!0},disty:{animate:!1}}},{trackPos:10,patternPos:0,layers:{backdrop:{name:"netbest_back",wobble:!0,animate:!0},scroller:!0,logo:{animate:!0,wobble:!0},rasterBar:{wobble:!0}}},{trackPos:12,patternPos:0,layers:{scroller:{back:3},backGrad:{top:!0,bottom:!0},disty:{animate:!0},diskfield:!0}},{trackPos:16,patternPos:32,layers:{scroller:{back:4},loop:!1}},{trackPos:17,patternPos:0,
layers:{backdrop:{name:"sad_back",wobble:!0,animate:!0},sprites:!0,scroller:!0,logo:{animate:!0,wobble:!0}}},{trackPos:21,patternPos:0,layers:{backdrop:{name:"sad_back",wobble:!1,animate:!1},sprites:!0,scroller:{back:5},logo:{animate:!1,wobble:!1}}},{trackPos:22,patternPos:0,layers:m},{trackPos:22,patternPos:48,layers:ta},{trackPos:22,patternPos:64,layers:m},{trackPos:22,patternPos:112,layers:ta},{trackPos:22,patternPos:128,layers:m},{trackPos:22,patternPos:208,layers:x},{trackPos:23,patternPos:0,
layers:m},{trackPos:23,patternPos:48,layers:ta},{trackPos:23,patternPos:64,layers:m},{trackPos:23,patternPos:112,layers:ta},{trackPos:23,patternPos:128,layers:m},{trackPos:23,patternPos:208,layers:x},{trackPos:24,patternPos:0,layers:{scroller:!0,starfield:!0,disty:{animate:!1},colourBar:{top:!0,bottom:!0},cube:{hold:{on:!0,rot:!0,bye:!1}}}},{trackPos:24,patternPos:128,layers:{scroller:{back:6},colourBar:{top:!0,bottom:!0},diskfield:!1,cube:{hold:{on:!0,rot:!0,bye:!0}}}},{trackPos:25,patternPos:0,
layers:{coppers:!0,scroller:!0,logo:{animate:!0,wobble:!0},colourBar:{top:!0,bottom:!0}}},{trackPos:27,patternPos:0,layers:{coppers:!0,scroller:!0,logo:{animate:!0,wobble:!0},colourBar:{top:!0,bottom:!0},vectaDisk:!0}},{trackPos:30,patternPos:0,layers:{coppers:!0,scroller:!0,logo:{animate:!0,wobble:!0},colourBar:{top:!0,bottom:!0},vectaDisk:{wibble:!0}}},{trackPos:32,patternPos:0,layers:{scroller:{back:7},backdrop:{name:"ptrail_bkg",wobble:!0,animate:!0},cube:!0}},{trackPos:33,patternPos:0,layers:{scroller:!0,
backdrop:{name:"ptrail_bkg",wobble:!0,animate:!0},disty:{animate:!1},cube:!0}},{trackPos:34,patternPos:0,layers:{scroller:!0,backdrop:{name:"ptrail_bkg",wobble:!0,animate:!0},cube:!0}},{trackPos:35,patternPos:0,layers:{scroller:!0,backdrop:{name:"ptrail_bkg",wobble:!0,animate:!0},disty:{animate:!1},backGrad:{top:!0,bottom:!1},diskfield:!0,cube:!0}},{trackPos:36,patternPos:0,layers:Ea},{trackPos:36,patternPos:64,layers:r},{trackPos:36,patternPos:128,layers:Ea},{trackPos:36,patternPos:192,layers:r},
{trackPos:37,patternPos:0,layers:Ea},{trackPos:37,patternPos:64,layers:r},{trackPos:37,patternPos:128,layers:Ea},{trackPos:37,patternPos:192,layers:r},{trackPos:38,patternPos:0,layers:Fa},{trackPos:38,patternPos:64,layers:Ga},{trackPos:38,patternPos:128,layers:Fa},{trackPos:38,patternPos:192,layers:Ga},{trackPos:39,patternPos:0,layers:Fa},{trackPos:39,patternPos:64,layers:Ga},{trackPos:39,patternPos:128,layers:Fa},{trackPos:39,patternPos:192,layers:Ga},{trackPos:40,patternPos:0,layers:{scroller:{back:7},
disty:{animate:!1},backGrad:{top:!1,bottom:!0},sprite:{bob:da},vectaDisk:!0}},{trackPos:40,patternPos:240,layers:{scroller:!0,backdrop:{name:"presents",wobble:!1,animate:!0},sprite:{bob:da},logo:{animate:!0,wobble:!0},vectaDisk:!0}},{trackPos:41,patternPos:0,layers:{scroller:!0,presents:!0,logo:{animate:!1,wobble:!1},loop:!1}},{trackPos:42,patternPos:0,layers:{presents:!0,loop:!1}},{trackPos:42,patternPos:128,layers:{spacebar:!0,presents:!0,loop:!0}}],F=!0,la=50,ua=1.8,G=405,I=!0,ja=0,z=10,wa=z,ma=
0,na=0,X=100,A=X,B=X,C=1.8,E=C+.6,L=E+.6,va=0,M=0,O=0,R=0,W=0,ea=d.group.position.x,ga=d.group.position.y,ha=c.group.position.x,ia=c.group.position.y,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,ka=bb,xa=0;oa.play();a=q[u].layers;k();window.onkeypress=Pa;h()},Pa));l.add(new SeniorDads.Demos.Demo.DemoPart(null,function(){function a(){if(!p)var e=n.length;if(0<m){m-=.025;for(var q=0;q<e;q++)n[q].canvas.style.opacity=m}else{for(q=0;q<e;q++)n[q].hide();p=!0}e=Ra(l,f,g);f=e.backDropY;g=e.backdropCleared;w.show();w.clear();
x.drawPart(w,0,0,ia.h(),r+ia.v(),640,400);r<t&&(r+=1);c--;0==c?b():d&&requestAnimFrame(a)}function b(){d=!1;Qa()}(function(){var a="YOU HAVE BEEN WATCHING A PRODUCTION BY..;;    THE MEGAMIGHTY FLIPPIN' BEST..... ;;        *** SENI0R = DADS ***!!!!! ;; With a new demo in CODEF called...;;=========== The 'DEF DEMO!! ============;;A new standard in web browser based HTML;5 Javascript based demo programming!!!  ;;CREDITS!! (In order of appearance) =====;;Even the mighty CODEF wasnt quite wot we;needed, so OLD FART and DODDERING GIT;wrote a highly advanced demo system to ;make this monumental demo possible!!!;;We have named this highly advanced demo ;system 'THE SENIOR DADS ADVANCED DEMO;SYSTEM'.;;========================================;;      'Senior Dads Present' screen, ;       and demo art direction by... ;;           JACKSON POLLOCK!!!!;;========================================;;     EXCLUSIVE Disk Jockey Mix by...;;           DAME VERA LYNN!!!!! ;;This mix was inspired by top DJ Sasha!!!;;The name of the tune is 'Sashy Shit'.;;INTRO!! ================================;; Logo bouncer: OLD FART!!!!!!!!!!!!!!!!;; Chromakey distyscroll: DODDERING GIT!!;;TITLES!!! ==============================;;   Titles and Disty Dad: OLD FART!!!!!!;;   Stars and Rasters: DODDERING GIT!!!!;;   'Def Demo Logo:    JACKSON POLLOCK!!;;COPPER PIPES!! =========================;;      Moving background: OLD FART!!;;      Copper Pipes: DODDERING GIT!!;;DRUNKEN DAD!! ==========================;;      Disk Field: OLD FART!!!!!!!!!;;      Beer rasters: DODDERING GIT!!;;We were going to call it 'Piss Dad', but;we were told it might offend Americans!!;;PHASE 4 STEREO!! =======================;;    Phase 4 bobs: OLD FART!!!!!!!!!;;    Phase 4 stereo: DODDERING GIT!!;;This demo is in PHASE 4 STEREO!!!!!!!!!!;;WE 'TRUMP' in 3D!! =====================;;            Tri Dad-Mapping: ;;            OLD FART!!! AND;            DODDERING GIT!!;;BTW We don't realy support Donald Trump-;We're actually taking the piddle!!!!!!!!;;TRIDI DISKBOBS!! ======================;;   Diskbobs: OLD FART!!!!!!!!!!!!!!!!;;   Burpy Copper Bars: DODDERING GIT!!;;;CREDITS (HERE) !! =====================;;     Music: 'Rasero Team Fuck Out' ;     by DAME VERA LYNN!!!!!!!!!!!! ;;    Parallax background: OLD FART!!!;;    Scroller: DODDERING GIT!!!!!!!!!;;=======================================;;Tweet us!!! @seniordads!!!!!  ;;Surf us!!!  seniordads.atari.org;;Meet us!!!  Visit West Milton!!!!;;=======================================;;        (c) SENIOR DADS IN THE ;       YEAR OF OUR LORD 2015!!!;;;".split(";"),
b=a.length,d=16*b;x=new canvas(640,d+400);for(var c,e=0,f=0;f<b;f++){var h=a[f],g=h.length;c=0;if(0<g)for(var k=0;k<g;k++){var l=h.charCodeAt(k)-32;0<l&&E.drawTile(x,l,c,e,1,0,.5,1);c+=16}e+=16}v.draw(x,320-v.img.width/2,d+(200-v.img.height/2));x.contex.globalCompositeOperation="source-atop";x.quad(0,0,640,d,"rgba(255,255,128,0.80");ia=new SeniorDads.Wobbler([{value:0,amp:1,inc:.3},{value:.5,amp:2,inc:.4}],[{value:.5,amp:3,inc:.2},{value:0,amp:2,inc:.1}])})();var d=!0,c=2500,f=405,g=!0,l={name:"feat_back",
animate:!0,wobble:!0},n=[e,N,J,V,ca,S,T,U,Q],m=1,p=!1,t=x.canvas.height-400,r=-400;w.show();window.onkeypress=b;B.play();a()},Qa));l.add(new SeniorDads.Demos.Demo.DemoPart(null,function(){function a(){C.FlushWaitVbl();Oa.pause();l.next()}requestAnimFrame(function(){G=new RIFFWAVE;G.header.numChannels=2;G.header.bitsPerSample=8;G.header.sampleRate=25600;for(var b=new Uint8Array(Na,0,524288),d=[],c=0;524288>c;c++)d[c]=b[c];G.Make(d);Oa=new Audio(G.dataURI);Oa.play();(new SeniorDads.Bomb).bombCanvas(w,
14);C.WaitVbl(100,a)})},null));this.Load=l.load;this.LoadAndStart=l.loadAndStart;this.Start=function(){l.init();l.start()};this.Next=l.next;this.Abort=l.abort;this.fullscreen=function(){C.fullscreen()};this.width=640;this.height=400};