const User = require('../models/users');
const upload = require('../utils/multer');
const bcrypt = require('bcrypt');



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

        newUser.set({ firstname, lastname, email, phone, image: imgUrl, password: pwd })
        await newUser.save();
        res.status(200).send({data: newUser, message: "Sign Up Successful!"})
    } catch (error) {
        console.log(error)
        res.status(500).send({ error, message: "Could Not Create User! "})
    }
} 