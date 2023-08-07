import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user'; // Import the User model or replace with the actual path
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ecommerce_jwt_secret_key_zxc",
};
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findOne({ email: payload.email });
    if (user.role==='admin') {
      console.log("verified")
      return done(null, user);
    } else {
      console.log("not verified");
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});
passport.use(jwtStrategy);
export const verifyAdmin = passport.authenticate('jwt', { session: false });