const User = require('../models/users');
const upload = require('../utils/multer');



// sign up 
exports.uploadProfileImage = upload.single('image', 3);

exports.signup = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password, phone } = req.Body;
        const userExists = User.exists({ email });
        if (userExists) return res.status(400).send({message: "Email Already In Use!"});

        // save profile url
        const { file } = req;
        const imgUrl = "";

        try {
            // // for (file of files) {
            // //   console.log(file);
            //   imgUrl = files.location;
            // }
            imgUrl = file.location
        } catch(error){
            res.status(500).send({message: "Error Uploading Images"})
        }

        const newUser = new User();
        newUser.setPassword(password);
        newUser.set({ firstname, lastname, email, phone, imgUrl })
        await newUser.save();
    } catch (error) {
        res.status(500).send({ error, message: "Could Not Create User! "})
    }
} 