SeniorDads.CreateNameSpace("SeniorDads.Demos");
SeniorDads.Demos.AnalTuck=function(u,v,m){this.blah="s3N10r dAdZz ruL3c-=- 1n hTmL5!!!!1!1!!";function q(){s.Stop();f.Clear();f.Show();k.Hide();e.Hide();null!=m&&m()}void 0!==m&&(m=null);var a,g,r,k,f,e,l,s,t=null;a=new SeniorDads.Demos.Demo(function(a){void 0!==a&&(t=a);g=new SeniorDads.ScreenHandler(u,v,320,240);r=g.add("fire1",2,new SeniorDads.Image("resources/fire1.png"));k=g.add("fire2",2,new SeniorDads.Image("resources/fire2.png"));l=new SeniorDads.Font.Tos("../common/resources/tosfont.bin");s=
new SeniorDads.Music("MOD","resources/fanfare.bin",!0);new SeniorDads.Loader([r,k,l,s],t);e=g.add("textOverlay",2);f=g.add("initText",2)},null,q);a.add(new SeniorDads.Demos.Demo.DemoPart(null,function(){function e(b){var a=((b&63488)>>12).toString(16),c=((b&2016)>>7).toString(16);b=((b&31)>>1).toString(16);return"#"+a+a+c+c+b+b}function n(b){d.fillStyle=b;d.fillRect(h++,p,1,1);320<h&&(h=0,p++)}var k=new Uint16Array([5,1,2,1,5,1,3,4,5,6,2,1,1,1,1,4,50,1]),h=0,p=0,d=f.context();f.Clear("#ffffff");l.PrintText(f,
0,0,"THE SENIOR DADS\n\n\npresent\n\nTHE aNaL TuCK demo!\n\n68030 code by Nonce\nDSP code by Jessie");f.Show();g.WaitVbl(200,function(){function b(){h<l?(c=k[h],g.WaitVbl(c,d)):(g.FlushWaitVbl(),f.Hide(),a.next())}function d(){n(e(c));for(var a=159;-1<a;a--)n(e(a)),c^=a,c=!c,n(e(c));h++;b()}var c,l=k.length,h=0;b()})},function(){g.FlushWaitVbl()}));a.add(new SeniorDads.Demos.Demo.DemoPart(null,function(){function f(){a.next()}var n=[" REALTIME FIRE EFFECT","         TAKES 0NE SCANLINE","  YET AGAIN WE CANNOT BE BEATEN"],
m=n.length-1,h=0,p=0,d=20,b=!0,q=e.context(),c;l.SetColours([255,255,255,255],[0,0,0,255]);s.Play();r.Show();e.Show();var t=setInterval(function(){20==d?h>m?(clearInterval(t),b=!0,g.WaitVbl(70,f)):(c=n[h++],p=8*d,l.PrintText(e,0,d,c)):(l.PrintText(e,0,d,c),q.clearRect(0,p,320,8),p=8*d);d--;0>d&&(d=20);b?(r.Hide(),k.Show(),e.Show()):(r.Show(),k.Hide(),e.Hide());b=!b},140)},q));a.add(new SeniorDads.Demos.Demo.DemoPart(null,q,null));this.Load=a.load;this.LoadAndStart=a.loadAndStart;this.Abort=a.abort};