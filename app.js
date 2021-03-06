const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// ROUTES
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

// DB Connection
mongoose.connect(process.env.DB_CLOUD, 
    { useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(
        () => {
            console.log(">>> Database Connection Successful!")
        }).catch( (error) => {
            console.log("<<< Unable To Connet To Database");
            console.log(error);
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


app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes);

// not found route
app.use("**", (req, res) => {
    res.status(404).send({ message: "Route not found" });
});

module.exports = app;
