const mongoose = require("mongoose");
const User = require("./User");
const dayjs = require("dayjs");

const blogSchema = new mongoose.Schema({
  image: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Blog must have a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Blog must have a description"],
  },
  userPosted: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  dateCreated: {
    type: String,
    default: dayjs(new Date()).format("MMMM DD, YYYY"),
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
