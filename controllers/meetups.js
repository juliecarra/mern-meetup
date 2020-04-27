const Meetup = require("../models/Meetup");
const User = require("../models/User");

exports.getMeetups = async (req, res) => {
  const { category } = req.query || {};
  const { location } = req.query || {};
  const findQuery = location
    ? Meetup.find({ processedLocation: { $regex: ".*" + location + ".*" } })
    : Meetup.find({});
  try {
    var meetups = await findQuery
      .populate("category")
      .populate("joinedPeople")
      .exec();

    if (category) {
      meetups = meetups.filter((meetup) => {
        return meetup.category.name === category;
      });
    }

    return res.status(200).json(meetups);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getMeetupById = async (req, res) => {
  const { id } = req.params;
  try {
    var meetup = await Meetup.findById(id)
      .populate("meetupCreator", "name id avatar")
      .populate("category")
      .populate({
        path: "joinedPeople",
        options: { limit: 5, sort: { username: -1 } },
      })
      .exec();
    return res.status(200).json(meetup);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createMeetup = (req, res) => {
  const meetupData = req.body;
  const user = req.user;

  const meetup = new Meetup(meetupData);
  meetup.user = user;
  meetup.status = "active";

  meetup.save((err, createdMeetup) => {
    if (err) {
      return res.status(422).send(err);
    }
    return res.status(201).json(createdMeetup);
  });
};

exports.joinMeetup = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const meetup = await Meetup.findById(id);
    meetup.joinedPeople.push(user);
    meetup.joinedPeopleCount++;

    await meetup.save();
    await User.updateOne(
      { _id: user._id },
      { $push: { joinedMeetups: meetup } }
    );

    return res.status(200).json({ id });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.leaveMeetup = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  try {
    await Meetup.updateOne(
      { _id: id },
      { $pull: { joinedPeople: user._id }, $inc: { joinedPeopleCount: -1 } }
    );
    await User.updateOne({ _id: user._id }, { $pull: { joinedMeetups: id } });

    return res.status(200).json({ id });
  } catch (error) {
    return res.status(500).send(error);
  }
};
