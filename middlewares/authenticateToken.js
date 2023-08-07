import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user'; // Import the User model or replace with the actual path
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findOne({ email: payload.email });
    if (user && payload._id === user._id) {
      console.log("verified")
      return done(null, user);
    } else {
      console.log(user);
      console.log(payload.email);
      console.log("not verified");
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});
passport.use(jwtStrategy);
export const authenticateToken = passport.authenticate('jwt', { session: false });