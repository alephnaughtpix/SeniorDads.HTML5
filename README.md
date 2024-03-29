# Seniordads in HTML5

## The Senior Dads demos in HTML5 and Javascript.

### Current version: v0.5 (2015-09-04)

## Updates

### v0.5 (2015-08-07)
* "The 'Def Demo" now complete and released, with comments.
* YouTube style Senior Dads Demo Player.
* Codef screen handling added to Screenhandler.js .
* JSDoc commenting for Font.js, Image.js, and some of ScreenHandler.js
* Updates to ScreenHandler, Loader and various code improvements.

### v0.4 (2015-08-07)
* Entirely new demo "The 'Def Demo" 50% complete.
* New test demo of JS-based SoundBox music (For possible sequel to "The 'Def Demo".) added.
* Changes to loader code. (This required changes to the other resource code and the existing demos.)
* "Wobble" calculator!
* 3rd party additions to codebase: Atariscreen (Required for future demos.) and Codef (Required for "The 'Def Demo".), SoundBox and Blob.
* Adding JSDoc commenting. SeniorDads.js and Loader.js already done.

### v0.3 (2014-04-17)
* "DadPlazz!" 99% complete.

### v0.2 (2014-04-08)

* "Anal Tuck" completed.
* "Colonic Irrigation" 99% complete.


---

## Introduction

This project aims to recreate the The Senior Dads demos from Atari 16/24 bit computers as faithfully 
as possible in HTML5 and Javascript, as well as implement new HTML5 demos by the crew.

The Senior Dads were a "fake" demo crew active from early 1995 to early 1998. Their demos were mostly
released on the Atari Falcon 030, with one or two releases on the STE and STFM, so their work has not been 
widely seen outside the Atari community, as Atari emulators until recently (eg Hatari) have not been able 
to properly emulate their demos!

As well as being fun, I'm using this project as a proof of concept in order to learn how best to do demos 
on the Javascript/HTML5 platform.

## Demos recreated so far

* "Anal Tuck".
* "Colonic Irrigation".
* "DadPlazz!".

## New Demos created so far
* "The 'Def Demo"
* Test music demo (for future demo)

## Demos still to do

* "L'Aube Du Matin Du Soir 2" remix
* Air Dirt
* The ST Floormat Demo
* "Anti-Teckno" Teckno Demo
* Xmas Card 97
* Monomental
* The Ultimate Fake Demo

## Possible unreleased material to do
* Demestos! aka "DEMOSTOS" (Text-only space invaders game) 

---

## Running demos

Due to Javascript security issues, the demos must be run from a web server in order to load all the resources
(eg pictures, binary files) for each demo. Assuming you have set one up, and installed the files on your webserver
you can run the demos by pointing your browser at `http://[webserver root]/Seniordads.html5/demos/`.

## Folders
* `demos` - minified version of the demos.
* `demos.full` - full versions of the demos.
* `docs` - JSDocs for code. (Incomplete.)

... and within these folder are the following folders:
* `atuck` - "Anal Tuck" demo.
* `colonic` - "Colonic Irrigation" demo.
* `dadplazz` - "DadPlazz!" demo.
* `def` - "The 'Def Demo".
* `test` - Test Javascript music demo.
* `common` - Common code used by the demos. (See "Technology" below.)

## Technology

In order to faithfully recreate these Atari screens, common libraries have been set up, and are currently being worked on
in order to emulate the Atari systems these demos originally ran on, and to simplify the creation of what were often quite
hacky demos originally coded in 680x0 assembler! 

These libraries are stored in the `common` folder, and include:
* `SeniorDads.js` - Generic demo/demopart shell, "Wobbler", Youtube style demo player, and Atari 'bomb' error creation! 
* `ScreenHandler.js` - Generic screen handler 
* `Loader.js` - Generic resource loader
* `Image.js` - Generic image handler
* `Font.js` - Emulation of Atari system font. (uses capture of Atari system font in `resources/tosfont.bin`.)
* `Music.js` - Music player- wrapper for CODEF music player. (See "Other code used" below.)
* `SoudBox.js` - Music player- wrapper for SoundBox music player. (See "Other code used" below.)

## Other code used

Where possible, all code is original. However, due to the complexity of emulating some of the Atari system (In
particular the sound and module playing), other code has been used. As before, this code is stored in the `common` folder.

* `Atariscreen/*.js` - Atariscreen by Michael James. (https://github.com/alephnaughtpix/AtariScreen.js/)
* `Music.js` - This is a modified version of music playing code by Antoine Santo from his CODEF project. ( http://codef.santo.fr )
* `riffwave.js` - Riffwave sample creation code by Pedro Ladaria.
* `Blob.js` - Blob implmentation by Eli Grey (http://eligrey.com), Devin Samarin (https://github.com/eboyjr), modified by Marcus Geelnard
* `Codef/*.js` - CODEF demo system by Antoine Santo ( http://codef.santo.fr )
* `SoundBox.js` - Music player- wrapper for SoundBox music player. (http://sb.bitsnbites.eu/)

