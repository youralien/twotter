var path = require('path');
var schema = require(path.join(__dirname, '../models/schema'))
var User = schema.User;
var getTwootsAndUsers = require('./getTwootsAndUsers');

var index = {};

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

index.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

module.exports = index;