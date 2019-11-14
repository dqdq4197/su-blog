const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const {User} = require('../models');

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

module.exports = router;