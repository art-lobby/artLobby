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
db.once('open', function(callback){
  console.log('mongo connected');
});


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


const users = [
  { id: 1, name: 'sam', email: 'sam@gmail.com', password: 'test123' },
  { id: 2, name: 'karen', email: 'karen@gmail.com', password: 'hello123' },
  { id: 3, name: 'alan', email: 'alan@gmail.com', password: 'hello123' }
];


//Set Static Folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Application Endpoints
//Login
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    next();
  }
};

const redirectAccount = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/account');
  } else {
    next();
  }
};

app.use((req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    res.locals.user = users.find(
      user => user.id === userId
    )
  }
  next()
});

app.get('/', (req, res) => {
  const { userId } = req.session;
  console.log(userId);
  if (userId) {
    res.redirect('account.html');
  } else {
    res.redirect('index.html');
  }
});

app.get('/account', redirectLogin, (req, res) => {
  const { user } = res.locals;
  res.redirect('account.html');
});

app.get('/login', redirectAccount, (req, res) => {
  res.redirect('login.html');
  //req.session.userId = 3;
});

app.get('/signup', redirectAccount, (req, res) => {
  res.redirect('signup.html');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = users.find(
      user => user.email === email && user.password === password
    )
    if (user) {
      req.session.userId = user.id;
      return res.redirect('/account');
    }
  }
  res.redirect('/login');
});

app.post('/signup', redirectAccount, (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    const exists = users.some(
      user => user.email === email
    )
    if (!exists) {
      const user = {
        id: users.length + 1,
        name,
        email,
        password
      }
      users.push(user);
      req.session.userId = user.id;
      return res.redirect('/account');
    }
  }
  res.redirect('/signup');

});

app.post('/logout', redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/home')
    }
    res.redirect('/login')
  })
});


app.listen(PORT, () => console.log(
  `http://localhost:${PORT}`
));