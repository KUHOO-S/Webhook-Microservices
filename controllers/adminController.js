const register = require("./register")
const list = require("./list")
const update = require("./update")
const ip = require('./ip');
const del = require('./delete');

const { response } = require("express");

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.send("HomePage");

    });
    
    app.use(register)       //@route= /register

    app.use(list)           //@route= /list
   
    app.use(update)         //@route= /update
 
    app.use(ip)             //@route= /ip
    
    app.use(del)            //@route= /delete


};