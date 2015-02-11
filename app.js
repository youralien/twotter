var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');

var app = express();

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI)

// Set up Templating
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set up Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

// single route
app.get('/', function(req, res) {
	console.dir(req.cookies);
		console.dir(req.session);
		var message;
		if (req.session.counter) {
			req.session.counter++;
			message = "Hello again! Thanks for visiting " + req.session.counter + " times";
		} else {
			message = "Hello, thanks for visiting this site!";
			req.session.counter = 1;
		}
		res.send(message);
})

var PORT = process.env.PORT || 3000;
app.listen(PORT);

