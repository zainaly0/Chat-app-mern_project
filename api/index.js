const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/User");

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process with a failure code
  }
};

connectDB();
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const createdUser = await User.create({ username, password });
    jwt.sign({userId:createdUser._id}, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token, {httpOnly: true});
      res.status(200).json("ok")
    });
  } catch (err) {
    if (err) throw err;
    console.error(err); // Log the error for debugging in place of ifelse
    res.status(500).json("error");
  }
});

app.listen(4040);
