const User = require('../models/users');


exports.getFeed = async ( req, res, next ) => {
    try{
        
    } catch (error) {
        res.status(500).send({error, message: "Could Not Get Feed!"})
    }
}