var path = require('path');
var schema = require(path.join(__dirname, '../models/schema'))
var User = schema.User;
var Twoot = schema.Twoot;

var index = {};

// GETS

index.home = function(req, res) {
	var sess = req.session;
	if (sess.name) {
		console.log(sess.name)
		res.send(sess.name)
	} else {
		res.render('home');
	}
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

index.login = function(req,res) {
	var name = req.body.name;
	User.findOne({'name': name}, function(err,user) {
		if (err) {
			res.status(500).send({'error': err});
			console.error(err);
		} else {
			console.log(user)
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