const local = require('./localStrategy');
const facebook = require('./facebookStrategy');
const kakao = require('./kakaoStrategy');
const {User} = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user, done) =>{
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        User.findOne({
          where: {id}
        })
        .then(user => done(null,user))
        .catch((error) => done(error));
      });
      local(passport);
      kakao(passport);
      facebook(passport);
};