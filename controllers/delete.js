const router = require('express').Router();

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;

const WebhooksService = require("../services/webhooks.service.js");
let broker = new ServiceBroker();
broker.createService(WebhooksService);



router.get('/delete', function (req, res) {
    console.log("@route= /delete");
    //res.render('todo', { datatodo: [res.targetUrl,res.uniqueID] });

});

module.exports = router;


