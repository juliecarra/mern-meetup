const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return done(new Error("User not found."));
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      User.findOne({ email })
        .then(foundUser => {
          if (!foundUser) {
            done(null, false, { message: "Incorrect email." });
            return;
          }

          if (!bcrypt.compareSync(password, foundUser.password)) {
            done(null, false, { message: "Incorrect password." });
            return;
          }

          done(null, foundUser);
        })
        .catch(err => done(err));
    }
  )
);
