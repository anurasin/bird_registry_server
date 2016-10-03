// require NPM modules
var express = require("express");
var mongoose = require("mongoose");
var bodyParser =  require("body-parser");

var app = express();
var db = mongoose.connection;

db.on('error', console.error);

//requiring local modules
var configs = require('./config');
var routes = require('./routes/routes');

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://'+configs.dbHost+'/'+configs.dbName);

routes(app);

// if you want to server static content (HTML etc), create Client folder.
//app.use('/',express.static('client'));

//starting the listener
app.listen(configs.applicationPort, function () {
  console.log('bird registry app listening on port '+configs.applicationPort+'!');
});
