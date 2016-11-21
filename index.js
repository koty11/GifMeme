var fs = require('fs');
var Canvas = require('canvas');
var services = require('./lib/data');
const c_config = require('./config/config');
var gm = require('gm').subClass({imageMagick: true});
var config = c_config();

var outputDirectory = config.outputDirectory();
var appendedFilename = config.appendedFilename();


var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

var getFontSize = function(context, text, width, height,font) {
    var fontSize = 100;
    context.textAlign = "center";
    context.fillStyle = "#fff";
    context.strokeStyle = "#000";
    context.lineWidth = 6;

    while(1) {
        context.font = "bold " + fontSize + "px "+font;
        if( (context.measureText(text).width < (width-15)) && (fontSize < height/10) ) {
            break;
        }
        fontSize-=2;
    }

    return {fontSize:fontSize, width:context.measureText(text).width};
};

var gifmemef = module.exports;

gifmemef.init = function(output, append){
    outputDirectory = output;
    appendedFilename = append;
};

gifmemef.generate = function(file, topText, bottomText,stroke,fill,font,font_name, next){


    console.log("font: ",font);


    if(!fs.existsSync(outputDirectory)){
        fs.mkdirSync(outputDirectory);
    }

    if(!endsWith(outputDirectory, '/')){
        outputDirectory = outputDirectory + '/';
    }

    var memefilename = file.split('/');
    memefilename = memefilename[memefilename.length-1];

    var parts = memefilename.split('.');
    var ext = parts.pop();
    parts.push(appendedFilename+'.'+ext);

    memefilename = parts.join('');

    topText = topText.toUpperCase();
    bottomText = bottomText.toUpperCase();

    gm(file).size(function(err, size){
        if(err){
            return next(err);
        }

        var width = size.width;
        var height = size.height;
        var canvas = new Canvas(width, height);
        var ctx = canvas.getContext('2d');

        var topFontSize = getFontSize(ctx, topText, width, height,font_name);
        var bottomFontSize = getFontSize(ctx, bottomText, width, height,font_name);

        gm(file).coalesce()
            .font(font)
            .stroke(stroke)
            .fill(fill)
            .fontSize(topFontSize.fontSize)
            .strokeWidth(1.5)
            .drawText(0, 15,  topText, "North")
            .fontSize(bottomFontSize.fontSize)
            .drawText(0, height-15-bottomFontSize.fontSize, bottomText, "North")
            .write(outputDirectory + memefilename, function (err) {
                if (err) {
                    return next(err);
                } else {
                    return next(null, outputDirectory + memefilename);
                }
        });
    });


};
