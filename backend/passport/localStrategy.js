const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User,Social } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session:true,
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({include:[Social], where: { email, verify:1 } });
      if (exUser) {
        const result = bcrypt.compareSync(password, exUser.password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};