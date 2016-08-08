var fs = require('fs');
var Canvas = require('canvas');
var gm = require('gm').subClass({imageMagick: true});

var outputDirectory = './tmp';
var appendedFilename = '-meme';

var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

var getFontSize = function(context, text, width, height) {
    var fontSize = 100;
    context.textAlign = "center";
    context.fillStyle = "#fff";
    context.strokeStyle = "#000";
    context.lineWidth = 6;

    while(1) {
        context.font = "bold " + fontSize + "px Impact";
        if( (context.measureText(text).width < (width-15)) && (fontSize < height/10) ) {
            break;
        }
        fontSize-=2;
    }

    return {fontSize:fontSize, width:context.measureText(text).width};
};

var gifmeme = module.exports;

gifmeme.init = function(output, append){
    outputDirectory = output;
    appendedFilename = append;
};

gifmeme.generate = function(file, topText, bottomText, next){

    if(!fs.existsSync(outputDirectory)){
        fs.mkdirSync(outputDirectory);
    }

    if(!endsWith(outputDirectory, '/')){
        outputDirectory = outputDirectory + '/';
    }

    var memefilename = file.split('/');
    memefilename = memefilename[memefilename.length-1];

    var parts = memefilename.split('.');
    parts.pop();
    parts.push(appendedFilename+'.gif');

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

        var topFontSize = getFontSize(ctx, topText, width, height);
        var bottomFontSize = getFontSize(ctx, bottomText, width, height);

        gm(file).coalesce()
            .font(__dirname+"/impact.ttf")
            .stroke("#000000")
            .fill('#ffffff')
            .fontSize(topFontSize.fontSize)
            .strokeWidth(1.5)
            .drawText(0, (topFontSize.fontSize+5),  topText, "North")
            .fontSize(bottomFontSize.fontSize)
            .drawText(0, height-15 , bottomText)
            .write(outputDirectory + memefilename, function (err) {
                if (err) {
                    return next(err);
                } else {
                    return next(null, outputDirectory + memefilename);
                }
        });
    });


};
