const Post = require('../models/posts');
const User = require('../models/users');
const upload = require('../utils/multer');

// sign up 
exports.uploadPostImage = upload.single('image');

exports.createPost = async(req, res)=>{
    
    try {
        // save post image url
        const { file } = req;
        let imgUrl = "";

        if (file) imgUrl = file.location;

        const data = req.body;

        const newPost = new Post({
            uploadersId: req.USER_ID,
            image: imgUrl,
            description: data.description
        });
        
        // 
        const user = User.findById({ _id: req.USER_ID });
        const following = user.following;
        newPost.save();
        const feed = await Post.find({ 'uploader': { $in: following } });
        if(!feed) feed = Post.find({});

        res.status(200).send({
            message: "Post Created Successfully!",
            feed
        })
    } catch (error) {
        res.status(500).send({error})
    }
    
}