var path = require('path');
var schema = require(path.join(__dirname, '../models/schema'))
var Twoot = schema.Twoot;
var getTwootsAndUsers = require('./getTwootsAndUsers');

var twoot = {};

twoot.create = function(req, res) {
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

twoot.delete = function(req, res) {
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

module.exports = twoot;