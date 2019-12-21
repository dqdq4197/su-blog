const express = require('express');
const cookieParser = require('cookie-Parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('dotenv').config();
const passportConfig = require('./passport');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const homeRouter = require('./routes/home');
const posttingRouter = require('./routes/postting');
const cors = require('cors');

const {sequelize} =require('./models');

const app = express();

sequelize.sync();
passportConfig(passport);

app.set('port', process.env.PORT || 5000);
app.use(morgan('dev'));


app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use('/', express.static(path.join(__dirname,'profiles')));
app.use('/poster/:id/', express.static(path.join(__dirname,'profiles')));
app.use('/', express.static(path.join(__dirname,'posterImage')));
app.use('/poster/:id/', express.static(path.join(__dirname,'posterImage')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/home', homeRouter);
app.use('/postting', posttingRouter);


//app.use((req, res, next) => {
//    const err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//  });
//   
  //app.use((err, req, res, next) => {
  //  res.locals.message = err.message;
  //  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //  res.status(err.status || 500);
  //  res.render('error');
  //});
  app.use(function (err, req, res, next) {
    console.log('문제는 여기 ->', err.field)
    next(err)
  })
  
  app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });
