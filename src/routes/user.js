const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/join", async (req, res) => {
  const { username, password, projectID, APIKey } = req.body;
  // console.log(req.body);
  // if (!projectID) {
  //   return res.status(400).json({ message: 'Your project ID is required' });
  // }
  // if (!APIKey) {
  //   return res.status(400).json({ message: 'API_KEY is required' });
  // }
  // const exists = await User.exists({ $or: [{ username }, { password }] });
  // if (exists) {
  //   return res.status(400).json({ message: 'This username/email is already taken.' });
  // }
  try {
    await User.create({
      username,
      password,
      projectID,
      APIKey,
    });
    return res.status(200).json({ message: "Successful Login!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username }); // outputs null value.
  if (!user) {
    return res.status(400).json({
      message: "An account with this username does not exist.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).json({
      message: "Wrong Password",
    });
  }

  return res
    .status(200)
    .json({ message: "Successful Login!", userId: user._id });
});

module.exports = router;
