const router = require('express').Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/user');

// follow
router
    .route('/follow')
    .put( auth,
           userController.follow);

// feed
router
    .route('/feed')
    .post( auth,
           userController.getFeed);

module.exports = router