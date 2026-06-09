var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/composers', indexRouter);

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
