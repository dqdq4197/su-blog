const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const {User} = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy(
      function(email, password, done) {
        User.findOne({ email}, function (err, user) {
          if(user) {
            const result = bcrypt.compare(password, user.password);
            if (result) {
              return done(null,user); 
            } else {
              return done(null,false,{message: '비밀번호가 일치하지 않습니다.'});
            }
          } else {
            return done(null,false, {message: '가입되지 않은 회원입니다.'})
          }
        })
      }
  ));
}

