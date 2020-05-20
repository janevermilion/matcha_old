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
/*
router.use('/', function (req, res, next) {
next();
})*/
router.get('/', function(req, res, next) {
   res.render('register', { title: 'Matcha-register' });
});

router.post('/registeruser', [
    check('username').isLength({min:3}).withMessage('username must have more than 2 characters'),
    check('password').isLength({min:6}).withMessage('password must have more than 5 characters'),
   body('username').not().isEmpty()
       .trim()
       .escape(),
   body('password').not().isEmpty()
       .trim()
       .escape(),
    body('email').not().isEmpty().isEmail().normalizeEmail()
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
      let regNewUser = require('../own_libraries/settings');
      regNewUser.registerNewUser(req.body);
      res.redirect("/");
   }
});
module.exports = router;