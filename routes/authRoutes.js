const router = require('express').Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const { ensureAuthenticated } = require('../config/oauth');

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
