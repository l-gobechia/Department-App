const passport    = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./app/models/user.model');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await UserModel.findOne({ username });
     
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        // check user password need to be done
        if (user.password !== password) {
            console.log(`@@@@@@@@@@@here`);
          return done(null, false, { message: 'Incorrect password.' });
        }
        
        return done(null, user);
    }
));
 