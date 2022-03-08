var express = require('express');
var router = express.Router();

var postsController = require('../controllers/postsController.js')

router.get('/posts', postsController.posts_all);

router.post('/posts', postsController.post_create);

router.get('/posts/:postid', postsController.post_get)

router.put('/posts/:postid', postsController.post_update);

router.delete('posts/:postid', postsController.post_delete);

router.post('/posts/:postid/likes', postsController.post_like);

router.put('/posts/:postid/likes', postsController.post_likes_unlike)

router.post('/posts/:postid/comments', postsController.post_comments_create);

router.put('/posts/:postid/comments/:commentid', postsController.post_comment_update);

router.delete('/posts/:postid/comments/:commentid', postsController.post_comment_delete);

router.post('/posts/:postid/comments/:commentid/likes', postsController.post_comment_like)

router.put('/posts/:postid/comments/:commentid/likes', postsController.post_comment_unlike)

module.exports = router;
