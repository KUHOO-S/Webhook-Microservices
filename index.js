var express = require('express')
var admin = require('./controllers/admin');
const setUser = require('./auth')
require('dotenv').config();

var app = express();

app.set('view engine', 'ejs');


app.use(express.static('./public'));
app.use(express.json())
app.use(setUser)          //for admin access


app.use('/admin', admin);


app.use('*', (req, res) => {
  res.send("<h1 align='center'>Oops wrong Url</h1>");
});


console.log("Listening on port :",process.env.PORT);
app.listen(process.env.PORT);
