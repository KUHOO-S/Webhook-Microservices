const register = require("./register")
const list = require("./list")
const update = require("./update")
const ip = require('./ip');
const del = require('./delete');

const { response } = require("express");

const router = require('express').Router();

    router.get('/', function (req, res) {
        res.send("HomePage");

    });
    
    router.use(register)       //@route= /register

    router.use(list)           //@route= /list
   
    router.use(update)         //@route= /update
 
    router.use(ip)             //@route= /ip
    
    router.use(del)            //@route= /delete



module.exports = router;