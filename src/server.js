const express = require("express");
const cors = require("cors");
const User = require('./models/User');
const bcrypt = require('bcrypt')
require("dotenv").config();
const mongoose = require('mongoose');


const app = express();
app.use(express.json());
const port = 5001;

// Enable CORS to allow cross-origin requests
app.use(cors());

// Routes
const analyticsRoutes = require("./routes/analytics");
const knowledgebaseRoutes = require("./routes/knowledgebase");

app.use("/analytics", analyticsRoutes);
app.use("/knowledge-base", knowledgebaseRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));

/////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/join", async (req, res) => {
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
          APIKey
      });
      return res.status(200).json({ message: 'Successful Login!' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
})

let APIKey;
let projectID;

app.post("/", async (req, res) => {
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
  APIKey = user.APIKey;
  projectID = user.projectID;
  return res.status(200).json({ message: 'Successful Login!' });

})

module.exports = APIKey;
module.exports = projectID;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
