var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
    next(createError(404));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
        type: 'error',
        status: res.status,
        message: err.message,
        stack: req.app.get('env') === 'development' ? err.stack : undefined
    })
});

module.exports = app;
