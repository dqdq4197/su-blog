const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const {User} = require('../models');
const path = require('path');

const router = express.Router();
router.post('/login',isNotLoggedIn, (req,res,next) => {
  passport.authenticate('local',(error,user,info) => {
    if(error) {
      res.status(500).json({
        message: error || 'Oops, something happened!',
      });
      console.log('loginerorr');
      return next(error);
    }
    if(!user) {
      req.flash('loginError', info.message);
      console.log('loginError');
      return res.status(500).json({
        message: error || info.message,
      });
    }
    return req.login(user, (loginError) => {
      if(loginError) {
        return (
          next(loginError),
          console.log('continue')
        );
      }
      return (
        res.json(user),
        console.log('login_success')
      )
    })
  })(req,res,next);
 
})

router.post('/singup', async(req,res,next) => {
  const {email,password,nick} = req.body;
  const hash = await bcrypt.hash(password, 12);
  await User.create({
    email,
    password: hash,
    nick
  })
  return res.redirect('/');
})

router.get('/logout', (req,res) => {
  req.logout();
  req.session.destroy();
  res.send('logout');
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profiles/')
  },
  filename(req, file, cb) {
  const ext = path.extname(file.originalname);  
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext); 
  },
  limits: { fileSize: 5 * 1024 * 1024 },
})

var upload = multer({ storage: storage })

router.post('/profile/img',upload.single('img'), (req, res) => {
  console.log('req.file:',req.file);
  //console.log(req.body);
  res.json({ url: `${req.file.filename}` });
  console.log('change')
});

module.exports = router;