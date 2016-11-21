var gifmemef = require('./index');

gifmemef.generate('./test.gif', 'Top Text', '','#396a0a','#54a00a',__dirname+'/assets/milk_script.ttf','Milk Script', function(err, filename){
    if(err){
        console.log(err);
    } else {
        console.log(filename);
    }
});
