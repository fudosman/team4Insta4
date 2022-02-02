const router = require('express').Router();
const authController = require('../controllers/auth')

router
    .route('/signup')
    .post( authController.uploadProfileImage,
           authController.signup )

// export router
module.exports = router;