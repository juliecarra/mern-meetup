var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
  text: {
    type: String,
    required: true,
    max: [995, "Text is too long, max is 995 characters"]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  thread: { type: Schema.Types.ObjectId, ref: "Thread" },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
