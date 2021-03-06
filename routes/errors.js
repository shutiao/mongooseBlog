
module.exports = function(app){
    
    //404s
    app.use(function(req, res, next){
	    res.status(404);

	    if(req.accepts('html')){
		return res.send("<h2>I'am sorry, I couldn't find that page.</h2>");
	    }

	    if(req.accepts('json')){
		return res.json({error: 'Not found'});
	    }

	    //default response type
	    res.type('txt');
	    res.send("Hmm, couldn't find that page.");
	})
				  
    //500 wrong with server, specific syntax
    app.use(function(err, req, res, next){
	    console.error('err at %s\n', req.url, err);
	    res.status(500).send("Oops, we made a boo boo.");
	})
}

    