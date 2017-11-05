const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const userRepository = require('./../repositories/user.repository');

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.SERVICE_URL}/auth/login/facebook/callback`,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await userRepository.findUserByFacebookId(profile.id);
    if (!user) {
      const facebookUser = {
        facebookId: profile.id,
        name: profile.displayName,
      };
      const newUser = await userRepository.add(facebookUser);
      return done(null, newUser);
    }
    return done(null, user);
  } catch (ex) {
    return done(ex);
  }
}));

module.exports = passport;
