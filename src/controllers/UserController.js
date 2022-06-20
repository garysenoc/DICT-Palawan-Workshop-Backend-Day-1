const User = require("../models/User");
const bcrypt = require("bcryptjs");

const test = (req, res) => {
  res.send("blog post auth testing route");
};

const createUser = async (req, res) => {
  try {
    //  image: {
    //     type: String,
    //     trim: true,
    //   },
    //   title: {
    //     type: String,
    //     required: [true, "Blog must have a title"],
    //     trim: true,
    //   },
    //   description:

    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    // const existingUser = await User.findOne({
    //   $or: [{ username: username }, { phone: phone }],
    // });

    const existingName = await User.findOne({ name: name });

    const existingUsername = await User.findOne({ username: username });

    if (existingName) {
      return res.status(400).json({
        status: "fail",
        message: "name already existing.",
      });
    }

    if (existingUsername) {
      return res.status(400).json({
        status: "fail",
        message: "username already existing.",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: name,
      username: username,
      password: passwordHash,
    });

    return res.status(200).json({
      status: "success",
      message: "You have successfuly created a new user",
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });
    }
    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      console.error("invalid credentials");
      return res.status(401).json({ errorMessage: "Invalid Credentials" });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Invalid Credentials" });
    }

    return res.status(200).json({
      status: "success",
      message: "You have successfuly logged in",
      userData: existingUser
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

module.exports = {
  test,
  createUser,
  loginUser,
};

