var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //res.render('register', { title: 'Matcha-register' });
    let settings = require('../own_libraries/settings');
    let isUserAccepted = settings.acceptToken();

    res.send("you get the link token");
});

module.exports = router;