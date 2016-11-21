#FORK!!
# GifMemeF [![NPM Version](https://img.shields.io/npm/v/gifmeme.svg?style=flat)](https://www.npmjs.org/package/gifmemef)
Node.js module for creating a meme from an animated gif will work with static images too such as jpeg and png.

# To Install
        $ npm install gifmemef

# Requirements
GifMeme utilizes Automattic's node-canvas module which has some pre-requisites (Cairo) that must be installed on your machine.  To find out more please check out their [Wiki](https://github.com/Automattic/node-canvas/wiki) and then come back here.

GifMeme is also utilizing ImageMagick to finalize the output of the animated gif.

# API

* init(outputDirectoryName, fileAppendedName) <br/> The outputDirectoryName is where the meme file will be written to on your file system.<br/><br/>fileAppendedName is a string that will be appended to the original file name. eg - if fileAppendedName = '-meme', photo.png will write out to photo-meme.png
* generate(file, topText, bottomText,stroke,fill,font,font_name, callback)<br/>file is the filename and location - eg. __dirname + 'public/images/photo.png'<br/><br/>topText and bottomText are the text that will be overlayed on the top and bottom of the photo respectively.<br/> callback will return the filename or an error
* Add your route's font ttf, and your font name

# Example Uses -
    var gifmeme = require('gifmeme');
    gifmeme.init('./tmp', '-meme');
    gifmeme.generate('./photo.gif', 'Top of Meme', 'Bottom of Meme', '#000000','#ffffff',__dirname+'/assets/impact.ttf','Impact', function(error, memefilename){
        if(error){
            console.log(error);
        } else {
            console.log(memefilename);
        }
    });
