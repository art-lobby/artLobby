// Import Node Native Modules
const path = require('path');

// Import Third Party Modules
const express = require('express');
const session = require('express-session');
const router = express.Router();

// Import Local Modules

// Setup Express App
const app = express();

app.use(express.json()); // For JSON data in the body
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded\

app.use(session({
  secret: "shh",
}));

// Declare App Constants
const PORT = process.env.PORT || 5000;


const users = [
  {name: 'sam', email: 'sam@gmail.com', password:'test123'},
  {name: 'karen', email: 'karen@gmail.com', password:'hello123'}
];

const usersArray = ["Karen", "Bob"];

//Set Static Folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Application Endpoints
//Login
var sess; // global session, NOT recommended

router.get('/',(req,res) => {
  sess = req.session;
  if(sess.email) {
    return res.redirect('/admin');
  }
  res.redirect('login.html');
});

router.post('/login',(req,res) => {
  sess = req.session;
  sess.email = req.body.email;
  res.end('done');
});

router.get('/admin',(req,res) => {
  sess = req.session;
  if(sess.email) {
    return res.redirect('account.html');
  }
  else {
    res.write('<h1>Please login first.</h1>');
    res.end('<a href='+'/'+'>Login</a>');
  }
});

router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
    if(err) {
      return console.log(err);
    }
    res.redirect('/');
  });

});

app.use('/', router);


app.listen(PORT, () => console.log(`server started on ${PORT}`));