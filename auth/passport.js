import localStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import { Users } from '../models/userModel.js';
localStrategy.Strategy;

export const authorize = (passport) => {
    passport.use(
        new localStrategy({ usernameField: 'username' }, async (username, password, done) => {
            await Users.findOne({ Username: username }).then( async (user) => {
                if (!user) done(null, false, { message: 'The username you entered is not registered to an account.' });
                await bcrypt.compare(password, user.Password).then((isMatch) => {
                    if (isMatch) {
                        done(null, user);
                    } else {
                        done(null, false, { message: 'Your password is incorrect.'});
                    }
                });
            }).catch((err) => console.log(`You have an error: ${err}`));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        Users.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

