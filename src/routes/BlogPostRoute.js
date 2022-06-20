const router = require("express").Router();
const {
  test,
  createPost,
  deletePost,
  updatePost,
  getAllPost,
  getPost,
  getAllPostUser,
} = require("../controllers/BlogPostController");

router.get("/test", test);
router.get("/get-all-posts", getAllPost); // For getting all post
router.get("/get-specific-post/:id", getPost); // For getting specifc post
router.get("/get-post-user/:id", getAllPostUser); // For getting all post of user
router.post("/create-post", createPost); // For creating post
router.delete("/delete-post/:id", deletePost); // For deleting post
router.patch("/update-post/:id", updatePost); // For updating post

module.exports = router;

