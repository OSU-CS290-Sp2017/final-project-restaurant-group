//do a bunch of requires to set things up
var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

//var twitData = require('./twitData');
var app = express();
var port = process.env.PORT || 3000;


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

//about.html serving
app.get('/about.html', function (req, res) {
	res.status(200).sendFile(path.join(__dirname, 'public', 'about.html'));
});

//index.html serving
app.get('/index.html', function (req, res) {
	res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

//index.js serving
app.get('/index.js', function (req, res) {
	res.status(200).sendFile(path.join(__dirname, 'public', 'index.js'));
});

//menu.html serving
app.get('/menu.html', function (req, res) {
	res.status(200).sendFile(path.join(__dirname, 'public', 'menu.html'));
});

//style.css serving
app.get('/style.css', function (req, res) {
	res.status(200).sendFile(path.join(__dirname, 'public', 'style.css'));
});


/*
//index creation
app.get('/', function (req, res, next){
	var templateArgs = {
		twits: twitData,
		doCreate: true
	}
	res.render('twitPage', templateArgs);
});

//individual twits page
app.get('/twits/:twitNum', function (req, res, next){
	var index = req.params.twitNum;
	var indexTwit = twitData[index];
	if (indexTwit){
		var templateArgs = {
			twits:[indexTwit],
			doCreate: false
		}
		res.render('twitPage', templateArgs);
	}
	else {
		next();
	}
});
*/

//404 handling
app.get('*', function(req, res){
	res.render('404page');
});

//port opening
app.listen(port, function (){
	console.log("server listening on port", port);
});