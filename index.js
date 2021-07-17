var express=require('express')
var bodyParser=require('body-parser');
var admin=require('./controllers/admin');
var app=express();
const { authUser, authRole } = require('./auth')
app.set('view engine','ejs');

//var urlencoded=bodyParser.urlencoded({extended:false});

app.use(express.static('./public'));

app.use(setUser)
var adminController=require('./controllers/adminController');

app.use('/admin', authUser, authRole,admin);
//adminController(app);
//app.use('/admin',admin);

app.use('*', (req, res) => {
    res.send("<h1 align='center'>Oops wrong Url</h1>");
});

function setUser(req, res, next) {
    const userRole = req;
    console.log(userRole);
    if (userRole=="admin") {
      req.user = userRole
    }
    next()
  }

console.log("Listening on port : 3000");
app.listen(3100);
