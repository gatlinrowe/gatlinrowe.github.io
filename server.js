var express= require("express");
var bodpars= require("body-parser");
var metover= require("method-override");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
var sequelize= require("sequelize");

var app = express();
var port= process.env.port || 3030

app.use(bodpars.json());
app.use(bodpars.urlencoded({extended: true}));
app.use(bodpars.text());
app.use(bodpars.json({type: "application/vnd.api+json"}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
	res.render('subjects', { subs: subjects });
});
console.log(__dirname);
var subjects = new Array(1);
subjects[1] = new Subject('pants', 'poop.jpg', 'do ya really need em?', '0', 'gatlin');
var email;
var pass;
var loggedin = false;

function login(){
	email = $('#emailform').val().trim();
	pass = $('#passform').val().trim()
	loggedin = true;
	$('#loginmodal').html(email);
};
function createSubject(){
	item = new Subject($('#titleform').val().trim(), $('#imgform').val().trim(), $('#descform').val().trim(), 0 , email);
	subjects.push(item);
	console.log(subjects);
}

function Subject(title, image, description, rating, owner) {
	this.title = title;
	this.image = image;
	this.description = description;
	this.rating = rating;
	this.owner = owner;
};

app.listen(port);