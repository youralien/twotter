var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./oauth.js');
var fbAuth = require('./authentication.js');
var User = require('./models/schema.js').User;
var ensureAuthenticated = require('./routes/ensureAuthenticated');

// routes
var index = require('./routes/index');
var twoot = require('./routes/twoot');

// mongo
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI)

// --- passport ---
// serialize and deserialize
passport.serializeUser(function(user, done) {
	console.log('serializeUser: ' + user._id)
	done(null, user._id);
});
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user){
		console.log(user)
		if(!err) done(null, user);
		else done(err, null)
	})
});

// --- express app ----
var app = express();

// Set up Templating
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set up Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', index.home);
app.get('/account', ensureAuthenticated, index.account);

app.get('/auth/facebook', 
	passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/',
										successRedirect: '/account' }));

app.get('/logout', index.logout);

app.post('/create', twoot.create);
app.post('/delete', twoot.delete);


var PORT = process.env.PORT || 3000;
app.listen(PORT);
