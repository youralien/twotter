var path = require('path');
var schema = require(path.join(__dirname, '../models/schema'))
var User = schema.User;
var Twoot = schema.Twoot;

var index = {};

// GETS

index.home = function(req, res) {
	getTwootsAndUsers(req, res, 'home');
};

index.account = function(req, res) {
	User.findById(req.session.passport.user, function(err, user) {
 		if (err) {
 			res.status(500).send({'error': err});
			console.error(err);
 		} else {
 			getTwootsAndUsers(req, res, 'account', {name: user.name});
 		}
	})
};

// POSTS

index.createTwoot = function(req, res) {
	var new_twoot = new Twoot({
		'author': req.session.passport.user,
		'text': req.body.text
	});

	new_twoot.save(function(err, twoot, numAffected) {
		if (err || (numAffected !== 1)) {
			res.status(500).send({'error': err});
			console.error(err);
		} else {
			console.log('Created New Twoot!');
			Twoot.findOne({_id: twoot._id})
				.populate('author')
				.exec(function(err,populated_twoot) {
					if (err) {
						res.status(500).send({'error': err});
						console.error(err);
					} else {
						res.status(200).json(populated_twoot);
					}
				});
		}
	});
};

index.FBlogout = function(req, res) {
	req.logout();
	res.redirect('/');
};

// DELETES

index.deleteTwoot = function(req, res) {
	var author = req.body._id;
	Twoot.findOne({_id: author})
		.remove(function(err,numAffected) {
			if (err || (numAffected !== 1)) {
				console.log(err);
				res.status(500).send({'error': err});
			} else {		
				console.log('Removed a twoot');
				res.end();
			}
		});
};

// HELPERS

function getTwootsAndUsers(req, res, view, context) {
	Twoot.find({})
		.populate('author')
		.limit(25)
		.sort('-createdOn')
		.exec(function(err, twoots) {
			if (err) {
				res.status(500).send({'error': err});
				console.error(err);
			} else {
				// initialize context to empty if it doesn't already exist
				context = (context) ? context : {}; 
				
				// add list of twoots to the context
				context.twoots = twoots;

				// find all users
				User.find({}, function(err, users) {
					if (err) {
						res.status(500).send({'error': err});
						console.error(err);
					} else {
						context.users = users;
						
						// if ajax send only local data
						if (req.xhr) {
							res.status(200).json(context);
						
						// else render entire page with local data
						} else {
							res.status(200).render(view, context);
						}

					}
				}); 
			}
		});	
}

module.exports = index;