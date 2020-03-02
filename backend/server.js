const express = require('express');
const cookieParser = require('cookie-Parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('dotenv').config();
const passportConfig = require('./passport');
// const apicache =require('apicache');
const aboutRouter = require('./routes/about');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const homeRouter = require('./routes/home');
const commentRouter = require('./routes/comment');
const posttingRouter = require('./routes/postting');
const tagRouter = require('./routes/tag');
const settingRouter = require('./routes/setting');
const cors = require('cors');
// let cache = apicache.middleware
const {sequelize} =require('./models');

const app = express();

sequelize.sync();
passportConfig(passport);

app.set('port', process.env.PORT || 5000);
app.use(morgan('dev'));

// app.use(cache('5 minutes'))
 
// app.get('/will-be-cached', (req, res) => {
//   res.json({ success: true })
// })
//app.use(express.static(path.join(__dirname,'public')));
app.use('*/img/', express.static(path.join(__dirname,'/profiles')));
app.use('*/img/', express.static(path.join(__dirname,'/posterImage')));
app.use(cors());

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
app.use('/comment', commentRouter);
app.use('/about', aboutRouter);
app.use('/tag', tagRouter);
app.use('/setting', settingRouter);


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
