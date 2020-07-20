const express = require('express');
const path = require('path');

const app = express();

//Set static folder
app.use(express.static(path.join(__dirname, 'artLobby')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('server started on ${PORT}'));

/*
var express = require ("express");
var app = express();
var bodyParser = require ("body-parser");
app.get("/", function(req, res){
    res.send("account.html")}); //takes you to home page
app.get("/", function(req, res){
    res.render("account.ejs")}); //takes you to account page
const PORT = process.env.PORT||5000;
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.listen(PORT, ()=>console.log("server started on PORT"));
*/

/*
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + 'Desktop\artLobby\node_modules\express\lib\view.js'));
app.set('views', __dirname + 'Desktop\artLobby\node_modules\express\lib\view.js');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.listen(app.get('port'), function() {
});
*/