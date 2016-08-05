var gifmeme = require('./index');

gifmeme.generate('./test.gif', 'Top', 'Bottom', function(err, filename){
    if(err){
        console.log(err);
    } else {
        console.log(filename);
    }
});
