var path = require('path');
var schema = require(path.join(__dirname, '../models/schema'))
var User = schema.User;
var Twoot = schema.Twoot;

module.exports = function getTwootsAndUsers(req, res, view, context) {
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