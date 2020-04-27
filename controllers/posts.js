const Post = require("../models/Post");
const Thread = require("../models/Thread");

exports.getPosts = async (req, res) => {
  const threadId = req.query.threadId;
  try {
    var posts = await Post.find({ thread: threadId }).populate("user").exec();
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createPost = (req, res) => {
  const postData = req.body;
  const post = new Post(postData);
  post.user = req.user;

  post.save((err, createdPost) => {
    if (err) {
      return res.status(422).send({ err });
    }

    Thread.update(
      { _id: createdPost.thread },
      { $push: { posts: createdPost } },
      () => {}
    );
    return res.status(201).json(createdPost);
  });
};
