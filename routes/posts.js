var express = require('express');
var router = express.Router();

PostsControllers = require('../controllers/posts');


router.route("/:id")
  .get(PostsControllers.readPostsOne)
  .patch(PostsControllers.updatePostsOne)
  .delete(PostsControllers.deletePostsOne);

router.route("/")
  .get(PostsControllers.readPostsAll)
  .post(PostsControllers.createPostsOne)
  .delete(PostsControllers.deletePostsAll);

module.exports = router;
