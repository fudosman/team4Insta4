const User = require('../models/users');


exports.getFeed = async ( req, res, next ) => {
    res.status(200).send({message: "Login Success"})
}