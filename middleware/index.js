var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports = function (app) {
    //app.use(express.logger('dev'));
    //Error: Most middleware (like logger) is no longer bundled with Express and must be installed separately. 
    app.use(morgan('dev'));
    
    // this is good enough for now but you'll
    // want to use connect-mongo or similar
    // for persistant sessions
    //app.use(express.cookieParser());
    app.use(cookieParser());

    app.use(session({ secret: 'building a blog' }));
    //app.use(express.bodyParser());
    app.use(bodyParser());
    
    // expose session to views
    app.use(function (req, res, next) {
	    res.locals.session = req.session;
	    next();
	})
}