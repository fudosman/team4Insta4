//// dependecies
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Load user model
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // check user match
            User.findOne({ email: email})
                .then(user => {
                    if(!user){
                        return done(null, false, { message: "User Does Not Exist" })
                    }
                    // check password match
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;
                        if(isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: "Username or Password Incorrect" })
                        }
                    })
                })
                .catch( err => console.error(err))
        })
    );

    // serialize and deserialize user
    passport.serializeUser( (user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser( (id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        });
    });
}