const User = require('../models/users');
const upload = require('../utils/multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// sign up 
exports.uploadProfileImage = upload.single('image');

exports.signup = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password, phone } = req.body;
        const userExists = await User.exists({ email });
        if (userExists) return res.status(400).send({message: "Email Already In Use!"});

        // save profile url
        const { file } = req;
        let imgUrl = "";

        if (file) imgUrl = file.location

        const newUser = new User();
        
        const salt = await bcrypt.genSalt(10);
        pwd = await bcrypt.hash(password, salt);

        newUser.set({ firstname, lastname, email, phone, image: imgUrl, password: pwd });
        const following = [newUser._id];
        newUser.set({following: following});
        
        await newUser.save();

        const token = jwt.sign({user_id: newUser._id}, process.env.SECRET);

        res.status(200).send({token: token,
            data: newUser,
            message: "Sign Up Successful!"})
    } catch (error) {
        console.log(error)
        res.status(500).send({ error, message: "Could Not Create User! "})
    }
} 

// signin 
exports.signin = async (req, res) => {
    try {
        const data = req.body;

        const user = await User.findOne({ email: data.email });
        if(!user) return res.status(400).send({message: "Invalid Email or Password!"});
        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if(!isValidPassword) return res.status(400).send({message: "Invalid Email or Password!"});

        const token = jwt.sign({ user_id: user._id }, process.env.SECRET, { expiresIn: 60*60});
        res.status(200).send({
            token
        })
    } catch(error){
        res.status(500).send({error, message: "Login Error!"})
    }
}