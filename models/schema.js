var mongoose = require('mongoose');
var Schema = mongoose.Schema


var userSchema = new Schema({
	oauthID: Number,
	name: String,
	created: Date
});

var twootSchema = new Schema({
	author: { type: Schema.Types.ObjectId, ref: 'twotterUser' },
	text: String,
	createdOn: { type : Date, default: Date.now } 
});

module.exports.User = mongoose.model('twotterUser', userSchema);
module.exports.Twoot = mongoose.model('Twoot', twootSchema);