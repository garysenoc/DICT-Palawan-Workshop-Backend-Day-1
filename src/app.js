const express = require("express");
const connect = require("./db/connect");
const cors = require("cors");
require("dotenv").config();

const UserRoute = require("./routes/UserRoute");
const BlogPostRoute = require("./routes/BlogPostRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", UserRoute);
app.use("/api/blog", BlogPostRoute);

app.listen(process.env.PORT, async () => {
  console.log("Server is running on port " + process.env.PORT);
  await connect();
});

