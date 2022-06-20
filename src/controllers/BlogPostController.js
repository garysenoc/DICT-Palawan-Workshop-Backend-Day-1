const BlogPost = require("../models/BlogPost");

const test = (req, res) => {
  res.send("blog post auth testing route");
};

const createPost = async (req, res) => {
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

    const image = req.body.image;
    const title = req.body.title;
    const description = req.body.description;
    const userPosted = req.body.userPosted;

    const newPost = await BlogPost.create({
      image: image,
      title: title,
      description: description,
      userPosted: userPosted,
    });

    res.status(200).json({
      status: "success",
      data: {
        newPost,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const ifExist = await BlogPost.findById(req.params.id);

    console.log(ifExist);

    if (!ifExist) {
      res.status(501).json({
        status: "fail",
        message: "Post not exist",
      });
    }

    await BlogPost.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: `Successfully deleted`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const image = req.body.image;
    const title = req.body.title;
    const description = req.body.description;

    const feature = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        image: image,
        title: title,
        description: description,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: "success",
      data: {
        feature,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await BlogPost.find();

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    //findOne({_id=req.params.id})
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

const getAllPostUser = async (req, res) => {
  try {
    const posts = await BlogPost.find({ userPosted: req.params.id }).populate(
      "userPosted",
      "name",
    );

    res.status(200).json({
      status: "success",
      length: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

module.exports = {
  createPost,
  deletePost,
  updatePost,
  getAllPost,
  getPost,
  getAllPostUser,
  test,
};

