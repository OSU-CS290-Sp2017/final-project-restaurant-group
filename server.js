//do a bunch of requires to set things up
var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var bodyParser = require ('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3000;

//set up the database location
var mongoHost = "classmongo.engr.oregonstate.edu";
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
  '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
var mongoDB;

console.log("mongoDB url: ", mongoURL);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());


//reservations page serving
app.get('/reservations.html', function (req, res, next){
	//collect reservations from DB
	var collection = mongoDB.collection('reservations');
	collection.find({}).toArray(function (err, resData){
		//if there's an error, report that
		if (err){
			res.status(500).send("Error finding reservations");
		}
		//otherwise get and print the reservations
		else{
			var templateArgs = {
				reservations: resData,
				mod: true
			}
			res.render('reservationsPage', templateArgs);
		}
	});
});

//individual reservations page serving
app.get('/reservations.html/:resNum', function (req, res, next){
	//collect a given reservation from DB
	var index = req.params.resNum;
	var collection = mongoDB.collection('reservations');
	collection.find({number: index}).toArray(function (err, resData) {
		//if there's an error, report that
		if (err){
			console.log("error finding reservation (" + req.params.resNum + ") from database", err);
			res.status(500).send("Error finding reservation from database");
		}
		//if there aren't any reservations, don't do anything
		else if (resData.length < 1){
			next();
		}

		else{
			var thisData = resData[0];
			var templateArgs = {
				reservations: [thisData],
				mod : false
			}
			res.render('reservationsPage', templateArgs);
		}
	});
});

//post handling
app.post('/reservations.html/:resName/addRes', function (req, res, next){
	//if all of the fields are set up, go ahead
	if (req.body && req.body.name && req.body.number && req.body.time){
		var collection = mongoDB.collection('reservations');
		var newRes = {
			name: req.body.name,
			number: req.body.number,
			time: req.body.time
		}
		//insert the new reservation & check for errors
		collection.insertOne(newRes, function(err, result){
			if (err){
				console.log("Error inserting reservation into database: ", err);
				res.status(500).send("Error inserting reservation into database: ", err);
			}
			else{
				res.status(200).send();
			}
		});

	}
	//if a field is missing, report that
	else {
		res.status(400).send("Reservation is missing one or more fields.");
	}
});
//app.use(express.static(path.join(__dirname, 'public')));

//about.html serving
app.get('/about.html', function (req, res) {
	res.status(200).sendFile(path.join(__dirname, 'public', 'about.html'));
});

//index.html serving
app.get('/index.html', function (req, res) {
	res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

//"normal" index serving
app.get('/', function (req, res) {
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

//404 handling
app.get('/*', function(req, res){
	res.status(404).render('404Page');
});

//port opening
MongoClient.connect(mongoURL, function (err, db){
	if (err){
		throw err;
	}
	mongoDB = db;
	app.listen(port, function (){
		console.log("server listening on port", port);
	});
});
