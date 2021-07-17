const router = require('express').Router();
const RequestIp = require('@supercharge/request-ip');

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;

const WebhooksService = require("../services/webhooks.service.js");
let broker = new ServiceBroker();
broker.createService(WebhooksService);


router.get('/ip', function (req, res) {
    console.log("@route= /ip");
    const ip = RequestIp.getClientIp(req);

    broker.start()
        // Calling the trigger action of webhooks service
        .then(() => broker.call("webhooks.trigger", {
            ipAddress: ip
        }))
        // Printing the response
        .then(result => {
            console.log(result);
            res.render('index', { data: result });
        })
        .catch(err => console.error(`Error occured! ${err.message}`));

});

module.exports = router;
