const mysql = require("mysql2");
var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { body } = require('express-validator');
var app = express();
/*
Первым делом в модуле signin.js создадим маршруты для sign in .
 Код сначала импортирует объект приложения Express, использует его для получения объекта Router и затем, применяя метод get(), добавляет к объекту пару маршрутов. В завершение модуль экспортирует объект Router .
 */
router.use('/', function (req, res, next) {
next();
})
router.get('/', function(req, res, next) {
   res.render('register', { title: 'Matcha-register' });
});

router.post('/registeruser', [
    check('username').isLength({min:5}).withMessage('username must have more than 5 characters'),
    check('password').isLength({min:6}).withMessage('password must have more than 6 characters'),
   body('username').not().isEmpty()
       .trim()
       .escape(),
   body('password').not().isEmpty()
       .trim()
       .escape()
], function (req, res) {
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      let errArr = errors['errors'];
      for(let i = 0;i < errArr.length; i++)
      {
         console.log('\x1B[31m'+errArr[i]['msg']);
      }
      res.send(errors);
   }
   else
   {
      let regNewUser = require('../public/javascripts/register_new_user');
      let resultOfRegistration = regNewUser(req.body);
      if(resultOfRegistration === true)
         console.log("New user was added to base");
      else
         console.log("error with adding user");
      res.send(resultOfRegistration);
   }
});
module.exports = router;