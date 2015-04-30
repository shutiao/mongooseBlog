var errors = require('./errors');
var login = require('./login');

module.exports = function(app){

    app.get('/', function(req, res){
	    res.render('home.jade');
	});
    
    // login / logout routes
    login(app);

    //error handles
    errors(app);
}