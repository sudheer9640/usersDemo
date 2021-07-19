import passport from 'passport';
import passportJwt from 'passport-jwt'
import {NextFunction, Request, Response} from 'express';
import {User} from '../mongoDb/models/user.model';
import {envConstants} from "./envConfig";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(
  new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envConstants.JWT_SECRET,
    },
    (jwtToken, done) => {
      User.findOne({_id: jwtToken._id}, (err: any, user: any) => {
        if (err) {
          console.log(err);
          return done(err, false)
        }
        if (user) {
          return done(null, user, jwtToken)
        } else {
          return done(null, false)
        }
      });
    }
  )
);

