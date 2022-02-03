const router = require('express').Router();
const userController = require('../controllers/user.js');


// GET ALL USERS
router.get("/friends", userController.findFriends);
router.put("/follow", userController.follow);
router.put("/unfollow", userController.unfollow);


// export router
module.exports = router;
