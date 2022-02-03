const User = require('../models/users');
const Post = require('../models/posts');


exports.getFeed = async ( req, res ) => {
    try {
        const user = await User.findById({ _id: req.USER_ID });
        const following = user.following;
        const feed = await Post.find({ 'uploader': { $in: following } });

        if(!feed) feed = Post.find({});

        res.status(200).send({
            status: "success",
            feed
        })
    } catch (error) {
        res.status(500).send({error, message: "Could Not Get Feed!"})
    }
}


exports.follow = async (req, res) => {
    try {
        await User.findOne({ username: req.params.username })
            .then( user => {
                user.followers.push( req.USER_ID );
                let followedUser = user._id;
                user.save();
                User.findOne({ _id: req.USER_ID })
                    .then(user => {
                        user.following.push(followedUser);
                        user.save()
                            .then( user => res.status(200).send({message: "success"}));
                    })
                    .catch (err => console.log(err));
            }) 
    } catch (error) {
        res.status(500).send({ error, message: "Could Not Follow User!" })
    }
}