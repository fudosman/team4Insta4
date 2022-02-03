const router = require('express').Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');

// Signup
router
    .route('/signup')
    .post( authController.uploadProfileImage,
           authController.signup);


// SignIn
router
    .route('/login')
    .post(authController.signin, userController.getFeed);


// export router
module.exports = router;
