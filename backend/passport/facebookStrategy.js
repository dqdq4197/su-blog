const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET_CODE,
        callbackURL: "auth/facebook/callback",
        passReqToCallback: true,
      },async (req,accessToken, refreshToken, profile, done) => {
          try {
              const exUser = await User.findOne({where:{ snsId : profile.id, provider: 'facebook'}});
              if(exUser) {
                  done(null, exUser);
              } else {
                const newUser = await User.create({
                      email: profile.id,
                      provider:'facebook',
                      nick:profile.displayName,
                      snsId:profile.id,
                  });
                  done(null, newUser);
              }
          } catch (error) {
              console.error(error);
              done(error);
          }
        }
    ))
};