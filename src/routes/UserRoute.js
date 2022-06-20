const router = require("express").Router();
const {
  test,
  createUser,
  login,
  loginUser,
} = require("../controllers/UserController");

router.get("/test", test);
router.post("/create-user", createUser);
router.post("/login-user", loginUser);
module.exports = router;

