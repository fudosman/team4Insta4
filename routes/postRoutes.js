const router = require('express').Router();
const auth = require('../middlewares/auth');
const postController = require('../controllers/post');

// create post
router
    .route('/createPost')
    .post( auth,
           postController.uploadPostImage,
           postController.createPost);


module.exports = router