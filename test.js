var gifmeme = require('./index');

gifmeme.generate('./test.gif', 'Top of My Meme', 'Bottom of my Meme YEAH!!!!', function(err, filename){
    if(err){
        console.log(err);
    } else {
        console.log(filename);
    }
});
