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
app.set('view engine' 'handlebars');

app.listen(port);