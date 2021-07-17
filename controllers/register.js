const router = require('express').Router();

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;

const WebhooksService = require("../services/webhooks.service.js");
let broker = new ServiceBroker();
broker.createService(WebhooksService);



router.get('/register', function (req, res) {
    console.log("@route= /register");
    broker.start()
        // Calling the register action of webhooks service
        .then(() => broker.call("webhooks.register", {
            targetUrl: "abc.com"
        }))
        // Printing the response
        .then(result => {
            console.log(result);
            res.render('index', { data: result });
        })
        .catch(err => console.error(`Error occured! ${err.message}`));

});

module.exports = router;