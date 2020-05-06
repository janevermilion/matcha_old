var express = require('express');
var router = express.Router();
/*
Первым делом в модуле signin.js создадим маршруты для sign in .
 Код сначала импортирует объект приложения Express, использует его для получения объекта Router и затем, применяя метод get(), добавляет к объекту пару маршрутов. В завершение модуль экспортирует объект Router .
 */
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('inside sign in');
});

module.exports = router;