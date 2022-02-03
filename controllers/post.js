// import post model
const Post = require("../models/posts");

// create a new post
exports.create = async (req, res) => {
  try{
    const { file } = req;
    const imgUrl = "";

    try {
      imgUrl = file.location
    } catch(error){
      console.log(error);
      res.status(500).send({message: "Error Uploading Images"});
    }

    const newPost = new Post();
    newPost.set({
      uploadersId: req.user._id,
      img: imgUrl,
      description: req.body.description,
      likes: [],
      comments: []
    })
    await newPost.save();
    console.log('post created');
  }catch(error){
    res.status(422).json({ error: error });
  }
};

// list all posts
exports.findAll = async (req, res) => {
  try {
    const posts = await Post.find({}).select("-password");
    res.json(posts);
  } catch (error) {
    res.status(422).json({ error: error });
  }
};

// find a post by id
exports.findById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).select("-password");
    res.json(post);
  } catch (error) {
    res.status(422).json({ error: error });
  }
};

// like a post
exports.like = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes.push(req.user._id);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(422).json({ error: error });
  }
};

// unlike a post
exports.unlike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes.pull(req.user._id);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(422).json({ error: error });
  }
};

// comment on a post
exports.comment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push(req.body.comment);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(422).json({ error: error });
  }
};

// delete a post
exports.delete = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.remove();
    res.json(post);
  } catch (error) {
    res.status(422).json({ error: error });
  }
};

// update a post
exports.update = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.set({
      uploadersId: req.body.uploadersId,
      img: req.body.img,
      description: req.body.description,
      likes: req.body.likes,
      comments: req.body.comments
    });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(422).json({ error: error });
  }
};


