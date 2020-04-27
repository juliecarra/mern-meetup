const express = require("express");
const router = express.Router();

const MeetupsCtrl = require("../controllers/meetups");
const AuthCtrl = require("../middlewares/auth");

router.get("", MeetupsCtrl.getMeetups);
router.get("/:id", MeetupsCtrl.getMeetupById);
router.post("/", AuthCtrl.isLoggedIn, MeetupsCtrl.createMeetup);
router.post("/:id/join", AuthCtrl.isLoggedIn, MeetupsCtrl.joinMeetup);
router.post("/:id/leave", AuthCtrl.isLoggedIn, MeetupsCtrl.leaveMeetup);

module.exports = router;
