'use strict';

module.exports = () => {

    const outputDirectory = "./tmp";
    const appendedFilename = "-meme";
    
    return {
        outputDirectory: () => outputDirectory,
        appendedFilename: () => appendedFilename
};

}
