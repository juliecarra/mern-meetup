var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var SALT_WORK_FACTOR = 10;

var userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: [4, "Username must be over 4 characters"],
    },
    name: {
      type: String,
      required: true,
      min: [2, "Name must be over 2 characters"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    password: {
      type: String,
      min: [
        4,
        "Password is too weak, should be should be at least 4 characters long",
      ],
      required: true,
    },
    avatar: String,
    infos: String,
    joinedMeetups: [{ type: Schema.Types.ObjectId, ref: "Meetup" }],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

var User = mongoose.model("User", userSchema);

module.exports = User;
