/*
Сначала при помощи require(...) выполняется импорт некоторых полезных библиотек node:
express, erve-favicon, morgan, cookie-parse, body-parser (они ранее были загружены для нашего приложения командой npm install),
а также path из основной библиотеки node (применяется для разбора путей каталогов и файлов).
 */




var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

/*
Затем require запрашивает модули из каталога путей route. Эти модули и файлы содержат код для обработки конкретного набора соответствующих путей (URL маршрутов).
Если мы расширим каркас приложения, например, чтобы получить список книг библиотеки, нам следует добавить новый файл для обработки пути, связанного с книгами.
 */
var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');

var app = express();

//получаем данные из формы логина
const bodyParser = require('body-parser');//нужен для обработки запросов форм

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/sign_in', (req, res) => {
  console.log(req.body);
  res.send(req.body);
})

//

// view engine setup
/*
Далее, импортированные модули express применяются для создания объекта app, который потом устанавливает движки-шаблоны представления. Установка движков состоит их двух частей.
В первой мы задаем значение 'view', указывая папку, в которой будут размещаться шаблоны (у нас это /views). Во второй мы задаем значение движка 'view engine', указывая на библиотеку шаблона (у нас — "pug").
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
/*
Следующие строки вызывают app.use(...), чтобы добавить промежуточные (middleware) библиотеки в цепочку обработки запросов.
Кроме сторонних библиотек, импортированных ранее, используем библиотеку Express.static, что позволит обрабатывать статические файлы из папки /public корня проекта.
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/*
Теперь, когда промежуточные библиотеки настроены, мы добавляем (импортированный ранее) код обработки путей в цепочку обработки запросов. Импортированный код будет задавать отдельные пути для разных частей сайта:
 */
app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/register', registerRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler Последняя в файле промежуточная библиотека добавляет методы обработки ошибок и ответов 404 от HTTP.
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/*
Объект app приложения Express теперь полностью настроен. Остался последний шаг - добавить его к экпортируемым элементам модуля (это позволит импортировать его в файле /bin/www).
 */
//создает базу данных и таблицы, если все правильно создалось вернет тру и в консоли упадет запись "база данных создана успешно" если нет то "база не создана"
var createBases = require("./public/javascripts/create_database_and_tables");
let isBaseAndTablesCreated = createBases();
/*
if (isBaseAndTablesCreated === true)
  console.log("База данных создана успешно или уже существует!");
else
  console.log("база не создана памагити!");*/
module.exports = app;
/*
запуск на винде:
SET DEBUG=express-locallibrary-tutorial:* & npm run devstart
запуск на яблоке:
DEBUG=express-locallibrary-tutorial:* npm run devstart
 */