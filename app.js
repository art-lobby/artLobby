// Import Node Native Modules
const path = require('path');

// Import Third Party Modules
const express = require('express');

// Declare App Constants
const PORT = process.env.PORT || 5000;

var sessions = require('express-session');

var session;

app.use(session({
  secret: "shh",
}));


const users = {
  '0': "sam",
  '1': "amanda"
};

const usersArray = ["Karen", "Bob"];

// Setup Express App
const app = express();

//Set Static Folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Application Endpoints
//Login
app.post('/frontend/login.html', (req, res, next) => {

  session = req.sessions;
  session.username = req.body.username;
  session.password = req.body.password;
  res.end('done');
  

});

app.get('/frontend/login.html', (req, res, next) => {

  session = req.sessions;


  if (req.body.username == 'karen' && req.body.password == 'test123'){
    
    res.redirect("/frontend/account");
    

  }
  else{
    res.write(<h1>'enter valid username'</h1>);
    res.end('<a href='+'/ '+'>login</a>');
    console.log("error");
  }

});



// Signup
app.post('/frontend/signup.html', (req, res, next) => {

//for (i=0; )

  console.log(req.body.username);

  var i = 0;
  if (req.body.username == users['0'] ){

  //  res.redirect("/signup.html");


    console.log("username taken");
  }
  else {
    
   res.redirect("/frontend/login");
   users.push(req.body.username);
   console.log("error signup");

  }

});



app.listen(PORT, () => console.log(`server started on ${PORT}`));

