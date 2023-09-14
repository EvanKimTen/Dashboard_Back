const express = require("express");
const cors = require("cors");
const fetch = require('node-fetch'); 
require("dotenv").config();

require('./db'); // connecting to MongoDB

import("node-fetch")
  .then((fetch) => {
    // Your server logic that uses fetch here
  })
  .catch((err) => {
    console.error(err);
  });


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
  return res.render("join");
});

app.post("/join", async (req, res) => {
  const { username, password, projectID, APIKey } = req.body;
  if (!projectID) {
    return res.status(400).json({ message: 'Your project ID is required' });
  }
  if (!APIKey) {
    return res.status(400).json({ message: 'API_KEY is required' });
  }
  try {
      await User.create({
          username,
          password,
          projectID,
          APIKey
      });
      return res.redirect("/login");
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
})

app.get("/login", (req, res) => { // login GET request
  return res.render("SignIn");
})

app.post("/login", async (req, res) => { // login POST request 
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
  // Authorization processing...(?)
  try {
    const apiResponse = await fetch('https://developer.voiceflow.com/api/endpoint', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any required headers (e.g., API key, authentication token)
      },
    });
    if (apiResponse.ok) {
      const apiData = await apiResponse.json();
      // Handle the API data as needed
      res.status(200).json({ message: 'Login successful', apiData });
    } else {
      res.status(apiResponse.status).json({ message: 'API request failed' });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    res.redirect("/");
  } catch (error) {
    console.error('API request error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
