const mongoose = require("mongoose");

const connect = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/my-first-backend");
    await mongoose.connect(
      "mongodb+srv://ken_user:9rfHqDhmqv134GYC@cluster0.iso4k.mongodb.net/dictworkshop-backend?retryWrites=true&w=majority"
    );
    // mongodb compass link
    // mongodb+srv://ken_user:9rfHqDhmqv134GYC@cluster0.iso4k.mongodb.net/dictworkshop-backend
    console.log("database connected successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connect;
