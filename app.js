require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require('passport');

const User = require('./models/user');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
//const seedPosts = require('./seeds');
//seedPosts();

const index = require('./routes/index');
const posts = require('./routes/posts');
const reviews = require('./routes/reviews');
const { ObjectId } = require('mongodb');


const app = express();

mongoose.connect('mongodb+srv://rajitadarth422:xdpQFkc9g1pUt98K@cluster0.dzacj8y.mongodb.net/?retryWrites=true/surf-shop', { useNewUrlParser: true} );

const db = mongoose.connection;
db.on('error', console.error.bind( console ,'connection error:'));
db.once('open', () =>{
console.log("we're connected");
});

app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'hang jeong tan!',
  resave: false,
  saveUninitialized: true,

}));

app.use(passport.initialize());
app.use(passport.session());
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  //req.user = {
//'_id': '65adcba625c9bdb1a7542fe8',
//'username':'adit'
  //}
  res.locals.currentUser = req.user;
  res.locals.title = 'Surf Shop';
  res.locals.success = req.session.success || '';
  delete req.session.success;
  res.locals.error = req.session.error || '';
  delete req.session.error;
  next();
});
app.use('/', index);
app.use('/posts', posts);
app.use('/posts/:id/reviews', reviews);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
  console.log(err);
  req.session.error = err.message;
  res.redirect('back');
});

module.exports = app;
