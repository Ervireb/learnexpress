var createError = require('http-errors');
var express = require('express');
const favicon = require('serve-favicon');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Настройка движка представлений
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Подключение middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Подключение маршрутов
app.use('/', indexRouter);

// Обработка ошибок
app.use(function(req, res, next) {
    next(createError(404));
});

// Обработчик ошибок
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// Запускаем сервер на порту 3000
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

module.exports = app;