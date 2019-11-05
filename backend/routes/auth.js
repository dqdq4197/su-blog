const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {User} = require('../models');

const router = express.Router();
router.post('/login', (req,res,next) => {
  passport.authenticate('local',(error,user,info) => {
    if(error) {
      res.status(500).json({
        message: error || 'Oops, something happened!',
      });
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
        return next(loginError);
      }
      user.dd="true";
      return res.json(user);
    })
  })(req,res,next);
 
})

router.post('/singup', async(req,res,next) => {
  const {email,password} = req.body;
  const hash = await bcrypt.hash(password, 12);
  await User.create({
    email,
    password: hash,
  })
  return res.redirect('/');
})

router.get('/logout', (req,res) => {
  return console.log('success');
});

module.exports = router;