var mongoose = require('mongoose');
var Schema = mongoose.Schema


var userSchema = new Schema({
	name: String
});

var twootSchema = new Schema({
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	text: String,
	time: { type : Date, default: Date.now } 
}) 

module.exports.User = mongoose.model('twotterUser', userSchema);
module.exports.Twoot = mongoose.model('Twoot', twootSchema)