var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  image: String,
  name: String,
  createdAt: { type: Date, default: Date.now }
});
var Category = mongoose.model("Category", categorySchema);

module.exports = Category;
