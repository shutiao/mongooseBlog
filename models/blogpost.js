var mongoose = require('mongoose');

//define the schema
var schema = mongoose.Schema({
	title: {type: String, trim: true},
	created: {type: Date, default: Date.now},
	body: String,
	author: {type: String, ref: 'User'}
    })

    // create a query for comments with a blogpost _id matching `id`
    schema.statics.findComments = function (id, callback) {
    return this.model('Comment').find({ post: id }, callback);
}
    
    schema.statics.edit = function (req, callback) {
	var id = req.param('id');
	var author = req.session.user;
	
	// validate current user authored this blogpost
	var query = { _id: id, author: author };
	
	var update = {};
	update.title = req.param('title');
	update.body = req.param('body');
	
	this.update(query, update, function (err, numAffected) {
		if (err) return callback(err);

		if (0 === numAffected) {
		    return callback(new Error('no post to modify'));
		}
		
		callback();
	    })
    }
	

    
// when new blogposts are created, lets tweet
// npm install mongoose-lifecycle
// http://plugins.mongoosejs.com?q=events
    var lifecycle = require('mongoose-lifecycle');
schema.plugin(lifecycle);

//compile the model
var Post = mongoose.model('BlogPost', schema);

//hanle events
Post.on('AfterInsert', function (post){
	//fake tweet this
	var url = 'http://localhost:3000/posts/';
	console.log('Read my new blog post! %s%s', url, post.id);
    });

module.exports = Post;