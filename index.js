var express=require('express')
var bodyParser=require('body-parser');
var admin=require('./controllers/admin');
var app=express();

app.set('view engine','ejs');

//var urlencoded=bodyParser.urlencoded({extended:false});

app.use(express.static('./public'));

var adminController=require('./controllers/adminController');
app.use('/admin',admin);
//adminController(app);

app.use('*', (req, res) => {
    res.send("<h1 align='center'>Oops wrong Url</h1>");
});

console.log("Listening on port : 3000");
app.listen(3000);
