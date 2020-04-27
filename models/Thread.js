var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var threadSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: [119, "Title is too long, max is 119 characters"]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  meetup: { type: Schema.Types.ObjectId, ref: "Meetup" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
});

var Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
