const express = require("express");
const cors = require("cors");
const User = require('./models/User');
require("dotenv").config();


const app = express();
app.use(express.json());
const port = 5001;

// Enable CORS to allow cross-origin requests
app.use(cors());

// Routes
const analyticsRoutes = require("./routes/analytics");
const knowledgebaseRoutes = require("./routes/knowledgebase");

app.use("/", analyticsRoutes);
app.use("/", knowledgebaseRoutes);

/////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/join", async (req, res) => {
  return res.render("SignUp");
});

app.post("/join", async (req, res) => {
  const { username, password, projectID, APIKey } = req.body;
  if (!projectID) {
    return res.status(400).json({ message: 'Your project ID is required' });
  }
  if (!APIKey) {
    return res.status(400).json({ message: 'API_KEY is required' });
  }
  const exists = await User.exists({ $or: [{ username }, { password }] });
  if (exists) {
    return res.status(400).json({ message: 'This username/email is already taken.' });
  }
  try {
      await User.create({
          username,
          password,
          projectID,
          APIKey
      });
      return res.redirect("/SignIn");
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
})

app.get("/login", (req, res) => {
  return res.render("SignIn");
})

let APIKey;
let projectID;

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(500).json({
      message: "An account with this username does not exist.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) { 
    return res.status(500).json({
      message: "Wrong Password",
    });
  }
  APIKey = user.APIKey;
  projectID = user.projectID;
  
})

module.exports = APIKey;
module.exports = projectID;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
