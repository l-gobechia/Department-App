const passport    = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./app/models/user.model');

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

require('dotenv').config();

passport.use(new LocalStrategy(
    async (username, password, done) => {
        console.log(`@@@@@@@@@@@@@@@@@@@@@@@here test`);
        const user = await UserModel.findOne({ username });
     
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        // check user password need to be done
        if (user.password !== password) {
            console.log(`@@@@@@@@@@@user.password !== password`);
          return done(null, false, { message: 'Incorrect password.' });
        }
        
        return done(null, user);
    }
));
 
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.secretOrKey
}, async (jwtPayload, cb) => {
    try {
        const id = JSON.parse(jwtPayload.data)._id
        const user = await UserModel.findById(id)
        return cb(null, user);
    } catch (error) {
        return cb(error);
    }
}
));