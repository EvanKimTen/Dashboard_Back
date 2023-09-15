const express = require("express");
const cors = require("cors");
const User = require('./models/clientModel');
require("dotenv").config();
require('./db'); // connecting to MongoDB


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
  const APIKey = user.APIKey;
  const projectID = user.projectID;

  const apiUrl = 'https://analytics-api.voiceflow.com/v1/query/usage';
  // Is this really corresponeded to the API after loggin in?
  import('node-fetch')
    .then(async (fetch) => {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': APIKey,
          },
          body: JSON.stringify({
            query: [
              {
                name: 'top_intents',
                filter: {
                  projectID,
                  startTime: 'YOUR_START_TIME',
                  endTime: 'YOUR_END_TIME',
                  limit: 5,
                },
              },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
        } else {
          console.error('API Request Error:', response.status, response.statusText);
          response.status(response.status).json({
            message: 'API Request Error',
          });
        }
      } catch (error) {
        console.error('API Request Error:', error.message);
        res.status(500).json({
          message: 'API Request Error',
        });
      }
    })
    .catch((err) => {
      console.error('Fetch Import Error:', err);
      res.status(500).json({
        message: 'Fetch Import Error',
      });
    });
  
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
