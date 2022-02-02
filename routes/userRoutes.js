const router = require('express').Router();
const authController = require('../controllers/auth')

router
    .route('/signup')
    .post( authController.uploadProfileImage,
<<<<<<< HEAD
           authController.signup )


module.exports = router;
||||||| 03e07d9
           authController.signup )
=======
           authController.signup )

// export router
module.exports = router;
>>>>>>> c61be0a4cede3a6828a88202fbef135edd2aac8b
