// Import Node Native Modules
const path = require('path');

// Import Third Party Modules
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const URI = "mongodb+srv://artLobby:CodeLabs2020@cluster0.bkz8v.mongodb.net/artLobby?retryWrites=true&w=majority"
const TWO_HOURS = 1000 * 60 * 60 * 2;


//DB connection
mongoose.connect(URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
  console.log('mongo connected');
});

// Import Mongoose Model
const User = require('./models/User');


// Declare App Constants
const {
  PORT = 5000,
  NODE_ENV = 'development',
  SESS_NAME = 'art-lobby',
  SESS_SECRET = 'jakdlhjkdsjgnlrglkarwjnv f',
  SESS_LIFETIME = TWO_HOURS
} = process.env;

const IN_PROD = NODE_ENV === 'production';
// Import Local Modules
// Setup Express App
const app = express();

app.use(express.json()); // For JSON data in the body
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded\

app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD
  }
}));


//Set Static Folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Application Endpoints
//Login

app.get('/', (req, res) => {
  if (!res.session) {
    res.redirect('/index.html');
  }
  res.redirect('/account.html');
});

app.get('/account', (req, res) => {
  if (!res.session) {
    res.redirect('/login.html');
  }
  res.redirect('/account.html');
});

app.get('/login', (req, res) => {
  if (!res.session) {
    res.redirect('/login.html');
  }
  res.redirect('/account.html');
});

app.get('/signup', (req, res) => {
  res.redirect('signup.html');
});

app.post('/login', (req, res) => {
  const userData = req.body;
  const email = userData.email;
  const password = userData.password;

  User.findOne({ email: email, password: password }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    } else if (!user) {
      return res.status(404).send();
    } else {
      req.session.user = user;
      console.log(req.session.user);
      res.redirect('/account');
    };
  })
});

app.post('/signup', (req, res) => {
  const userData = req.body;
  const name = userData.name;
  const email = userData.email;
  const password = userData.password;
  const status = userData.status;

  let newUser = new User();
  newUser.name = name;
  newUser.email = email;
  newUser.password = password;
  newUser.status = status;
  newUser.save(function (err, savedUser) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    res.redirect('/login');
  });
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/home')
    }
    res.redirect('/login')
  })
  // res.send();
});


app.listen(PORT, () => console.log(
  `http://localhost:${PORT}`
));
