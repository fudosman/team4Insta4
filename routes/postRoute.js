const router = require('express').Router();
const postRoute = require('../controllers/post');


router.post('/post', postRoute.create);
router.get('/', postRoute.findAll);
router.get('/:postId', postRoute.findById);
router.put('/:postId', postRoute.like);
router.patch('/:postId', postRoute.comment);
router.delete('/:postId', postRoute.delete);


module.exports = router;