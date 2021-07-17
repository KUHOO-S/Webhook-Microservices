var express=require('express')
var bodyParser=require('body-parser');

var app=express();

app.set('view engine','ejs');

//var urlencoded=bodyParser.urlencoded({extended:false});

app.use(express.static('./public'));

var adminController=require('./controllers/adminController');

adminController(app);

console.log("Listening on port : 3000");
app.listen(3000);
