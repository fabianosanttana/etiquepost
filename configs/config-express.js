var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function () {

    var app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    let allowCrossDomain = function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, accept, authorization, content-type, x-requested-with');
        next();
    }
    app.use(allowCrossDomain)
    app.use(expressValidator());

    return app;
}