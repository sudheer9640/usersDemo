"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_model_1 = require("../mongoDb/models/user.model");
const envConfig_1 = require("./envConfig");
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
passport_1.default.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: envConfig_1.envConstants.JWT_SECRET,
}, (jwtToken, done) => {
    user_model_1.User.findOne({ _id: jwtToken._id }, (err, user) => {
        if (err) {
            console.log(err);
            return done(err, false);
        }
        if (user) {
            return done(null, user, jwtToken);
        }
        else {
            return done(null, false);
        }
    });
}));
/*** Authorization Required middleware ***/
const isAuthorized = (req, res, next) => {
};
exports.isAuthorized = isAuthorized;
