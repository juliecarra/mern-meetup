const express = require("express");
const router = express.Router();

const UsersCtrl = require("../controllers/users");
const AuthCtrl = require("../middlewares/auth");

router.get("", UsersCtrl.getUsers);
router.get("/me", AuthCtrl.isLoggedIn, UsersCtrl.getCurrentUser);
router.get("/me/activity", AuthCtrl.isLoggedIn, UsersCtrl.getUserActivity);
router.patch("/:id", AuthCtrl.isLoggedIn, UsersCtrl.updateUser);
router.post("/signup", UsersCtrl.signup);
router.post("/login", UsersCtrl.login);
router.post("/logout", UsersCtrl.logout);

module.exports = router;
