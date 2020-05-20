var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

   if(req.query.act === 'accept' && req.query.token)
   {

       let settings = require('../own_libraries/settings');
       let isUserAccepted = settings.acceptToken(req.query.token);
   }
    res.render('settings', { title: 'Matcha-register',inside: "you get the token link"});
});

module.exports = router;