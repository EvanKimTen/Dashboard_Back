const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 5001;

// Enable CORS to allow cross-origin requests
app.use(cors());

// Routes
const analyticsRoutes = require("./routes/analytics");
const knowledgebaseRoutes = require("./routes/knowledgebase");
const transcriptRoutes = require("./routes/transcript");
const userRoutes = require("./routes/user");

app.use("/", analyticsRoutes);
app.use("/", knowledgebaseRoutes);
app.use("/", userRoutes);
app.use("/", transcriptRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));



app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
