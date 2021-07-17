const router = require('express').Router();

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;

const WebhooksService = require("../services/webhooks.service.js");
let broker = new ServiceBroker();
broker.createService(WebhooksService);



router.get('/delete', function (req, res) {
    console.log("@route= /delete");
    broker.start()
        // Calling the register action of webhooks service
        .then(() => broker.call("webhooks.delete", {
            uniqueID: req.body.uniqueID
        }))
        // Printing the response
        .then(result => {
            //console.log(result);
            res.send("Deleted Successfully")
            //res.render('index', { data: [result] });
        })
        .catch(err => console.error(`Error occured! ${err.message}`));

});

module.exports = router;


