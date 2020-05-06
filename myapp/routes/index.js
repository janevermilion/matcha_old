var express = require('express');
var router = express.Router();
//var signInRouter = require('./sign_in');
//var registerRouter = require('./register');

const app = express();
const bodyParser = require('body-parser');//нужен для обработки запросов форм

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Matcha' });
});

module.exports = router;
