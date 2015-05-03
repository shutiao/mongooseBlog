
var mongoose = require('mongoose');
var express = require('express');
var routes = require('./routes');
var models = require('./models');
var middleware = require('./middleware');

require('express-mongoose');

mongoose.connect('mongodb://localhost', function (err){
	if (err) throw err;
	console.log('connected!');

	var app = express();
	middleware(app);
	routes(app);

	app.listen(3000, function(){
		console.log('now listening on http://localhost:3000');
	    });
    });