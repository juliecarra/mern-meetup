var Thread = require("../models/Thread");

exports.getThreads = async (req, res) => {
  const meetupId = req.query.meetupId;

  try {
    var threads = await Thread.find() // fetch all documents from thread collection
      .where({ meetup: meetupId })
      // populate  uses provided objectId references an object from an other collection
      .populate({
        path: "posts", // here the associated posts document will be fetched as well
        options: { limit: 5, sort: { createdAt: -1 } },
        populate: { path: "user" }, //user document asssociated to the posts is feched as well
      })
      .exec();
    return res.status(200).json(threads);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getThreadById = async (req, res) => {
  const { id } = req.params;
  try {
    var thread = await Thread.findById(id).exec();
    return res.status(200).json(thread);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createThread = (req, res) => {
  const threadData = req.body;
  const thread = new Thread(threadData);
  thread.user = req.user;

  thread.save((err, createdThread) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.status(201).json(createdThread);
  });
};
