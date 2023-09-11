const express = require("express");
const cors = require("cors");
require("dotenv").config();

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

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
