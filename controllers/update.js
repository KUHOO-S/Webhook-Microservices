const router = require('express').Router();

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;

const WebhooksService = require("../services/webhooks.service.js");
let broker = new ServiceBroker();
broker.createService(WebhooksService);



router.get('/update', function (req, res) {
    console.log("@route= /update");
    broker.start()
        // Calling the update action of webhooks service
        .then(() => broker.call("webhooks.update", { 
            uniqueID: 1234,
            newTargetUrl: "lol.com" 
        }))
        // Printing the response
        .then(result => {
            console.log(result);
            res.render('index', { data: result });
        })
        .catch(err => console.error(`Error occured! ${err.message}`));

});

module.exports = router;