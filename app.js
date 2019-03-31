var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var favicon = require('serve-favicon');
var app = express();
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var flash = require('connect-flash');

mongoose.connect(
  'mongodb+srv://hienlam:Hien\@2019@assignment2food-nphvn.mongodb.net/COMP2106Assignment2Food',
	{
		useNewUrlParser: true
	}
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function (callback) {
    console.log('Connected to mongodb');
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var videosRouter = require('./routes/videos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/favicon.png'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Authentication Session
app.use(
  session({
    secret: 'sjfhckashkjfchkejhfjihewjfhkjewhfhejfhjhh',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  // Middleware for creating GLOBAL variable of isLoggedIn
  // based on truthy/falsey value of req.user from Passport
  res.locals.loggedIn = req.isAuthenticated();
  next();
});

// Passport config
var User = require('./models/users');
passport.use(new LocalStrategy(User.authenticate()));
// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: '768345160147-v2rqeq2f14n9b6ajjnhpraun4hg9hq1a.apps.googleusercontent.com',
    clientSecret: 'tAAiVEBsq8M0-4B2K2AnJgsE',
    callbackURL: 'https://hienlam-comp2106-assignment2.herokuapp.com/auth/google/callback',
    accessType: 'offline',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOne({ _id: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    User.findOne({ username: profile.id }, function (err, user) {
      console.log('Profile cua m ne: ' + profile.id);
      // console.log(auth2.currentUser.get().getId());
      if (!err && !user) {
        const newgoogle = new User({username: profile.id});
        newgoogle.save();
        return cb(null, newgoogle);
      } else {
        return cb(err, user);
      }
      // return done(err, user);
    });
  }
));

// GitHub
passport.use(new GitHubStrategy(
    {
      clientID: '9b5bc4c26261de340423',
      clientSecret: '74ee4c2af16858aa428d49fcbd0849ac9c5b2523',
      callbackURL: 'https://hienlam-comp2106-assignment2.herokuapp.com/auth/github/callback'
    },
    // Account.authenticate()
    function(accessToken, refreshToken, profile, cb) {
      User.findOne({ username: profile.username }, function(err, user) {
        if (!err && !user) {
          const newgithub = new User(profile);
          newgithub.save();
          return cb(null, newgithub);
        } else {
          return cb(err, user);
        }
      });
    }
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/all-foods', productsRouter);
app.use('/share-cooking', videosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
