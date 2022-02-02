const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config()

const app = express();

// ROUTES
const userRoutes = require('./routes/userRoutes')

// DB Connection
mongoose.connect(proocess.env.DB_LOCAL, 
    { useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(
        () => {
            console.log(">>> Database Connection Successful!")
        }).catch( (error) => {
            console.log("<<< Unable To Connet To Database");
            console.log(error)
        })


// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// implement express session
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));


// middleware for passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use('/user', userRoutes)

module.exports = app;