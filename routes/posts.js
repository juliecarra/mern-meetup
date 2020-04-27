const express = require("express");
const router = express.Router();

const PostsCtrl = require("../controllers/posts");
const AuthCtrl = require("../middlewares/auth");

router.get("", PostsCtrl.getPosts);
router.post("/", AuthCtrl.isLoggedIn, PostsCtrl.createPost);

module.exports = router;
