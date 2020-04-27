// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");
const morgan = require("morgan");

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");

require("dotenv").config();

const dbConfig = require("./config/default");
const path = require("path");

//Store sessions in MongoDB
const store = new MongoDBStore({
  uri: dbConfig.MONGO_URI,
  collection: "meetupSession",
});

// Catch errors
store.on("error", function (error) {
  console.log(error);
});

// Connect to MongoDB
mongoose
  .connect(dbConfig.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to MongoDB! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((error) => {
    console.error("Error while connecting to MongoDB", error);
  });

// Defining port
const port = process.env.PORT || 8080;

// Defining app
const app = express();

// Defining middlewares
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Defining the Routes
app.use("/api/meetups", require("./routes/meetups"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/threads", require("./routes/threads"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/ip", require("./routes/api"));

require("./services/passport");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/`);

module.exports = app;
