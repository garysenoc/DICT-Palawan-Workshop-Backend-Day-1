const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, "User must have a username"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

