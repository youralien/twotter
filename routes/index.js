var path = require('path');
var schema = require(path.join(__dirname, '../models/schema'))
var User = schema.User;
var Twoot = schema.Twoot;

var index = {};

// GETS

index.home = function(req, res) {
	Twoot.find({})
		.populate('author')
		.limit(25)
		.sort('-createdOn')
		.exec(function(err, twoots) {
			if (err) {
				res.status(500).send({'error': err});
				console.error(err);
			} else {
				var context = {}
				context.twoots = twoots;

				// if logged in, set name and loggedin local variables
				if (req.session.name) {
					context.name = req.session.name;
					context.loggedin = true;
				
				} else {
					context.loggedin = false;
				}

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
							res.status(200).render('home', context);
						}

					}
				}); 
			}
		});	
};


// POST HELPERS

function enableSession(req, res, user) {
	req.session._id = user._id;
	req.session.name = user.name;
	console.log(req.session.name + ' logged in')
	res.json(
		{
			'_id': req.session._id,
			'name': req.session.name
		}
	);
}

// POSTS

index.createTwoot = function(req, res) {
	author = req.session._id;
	text = req.body.text;

	new_twoot = new Twoot({
		'author': author,
		'text': text
	});

	new_twoot.save(function(err, twoot, numAffected) {
		if (err || (numAffected !== 1)) {
			res.status(500).send({'error': err});
			console.log(err);
		} else {
			console.log('Created New Twoot!');
			Twoot.findOne({_id: twoot._id})
				.populate('author')
				.exec(function(err,populated_twoot) {
					if (err) {
						res.status(500).send({'error': err});
						console.log(err);
					} else {
						console.log(populated_twoot);
						res.status(200).json(populated_twoot);
					}
				})
		}
	});
};

index.login = function(req,res) {
	var name = req.body.name;
	User.findOne({'name': name}, function(err,user) {
		if (err) {
			res.status(500).send({'error': err});
			console.error(err);
		} else {
			// User already in the system
			if (user) {
				console.log('User already in the System');
				enableSession(req,res,user);

			// Create New User		
			} else {
				console.log('Creating New User')
				var new_user = new User({
					'name': name
				});
				new_user.save(function(err, user, numAffected) {
					if (err || (numAffected !== 1)) {
						res.status(500).send({'error': err});
						console.log(err);
					} else {
						console.log('Created New User!')
						enableSession(req,res,user);
					}
				})
			}
		}
	});
}

module.exports = index;