const express = require("express");
const axios = require("axios");
const multer = require("multer");
const upload = multer();
const FormData = require("form-data");
const router = express.Router();

const User = require("../models/User");
const getUserKeys = require("../middleware/getUserKeys");
// const APIKey = process.env.DIALOG_MANAGER_API_KEY;

const managementApi = axios.create({
  baseURL: "https://api.voiceflow.com/v3alpha/knowledge-base/docs",
});

const queryApi = axios.create({
  baseURL: "https://general-runtime.voiceflow.com/knowledge-base/query",
});

//Get all data sources
router.get("/proxy/knowledge-base/:userId", async (req, res) => {
  try {
    const { API_KEY } = await getUserKeys(req.params.userId);
    const config = {
      headers: { authorization: API_KEY },
    };
    const response = await managementApi.get(
      "?Pagination=page=1&limit=50",
      config
    );
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Upload a URL
router.post("/proxy/knowledge-base/:userId", async (req, res) => {
  const { url } = req.body;
  console.log(url);
  try {
    const { API_KEY } = await getUserKeys(req.params.userId);
    const config = {
      headers: { authorization: API_KEY },
    };
    const response = await managementApi.post(
      "/upload",
      {
        data: {
          type: "url",
          url: url,
          name: url,
        },
      },
      config
    );
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Upload a File
router.post(
  "/proxy/knowledge-base/file/:userId",
  upload.any(),
  async (req, res) => {
    const { files } = req;
    const { buffer, originalname: filename } = files[0];

    const formFile = new FormData();
    formFile.append("file", buffer, { filename });
    try {
      const { API_KEY } = await getUserKeys(req.params.userId);
      const config = {
        headers: { authorization: API_KEY },
      };
      const response = await managementApi.post("/upload", formFile, config);
      res.send(response.data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//Delete document
router.delete("/proxy/knowledge-base/:documentID/:userId", async (req, res) => {
  try {
    const { API_KEY } = await getUserKeys(req.params.userId);
    const config = {
      headers: { authorization: API_KEY },
    };
    const response = await managementApi.delete(
      `/${req.params.documentID}`,
      config
    );
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//AI Preview
router.post("/proxy/knowledge-base/preview/:userId", async (req, res) => {
  const { question, settings } = req.body;
  try {
    const { API_KEY } = await getUserKeys(req.params.userId);
    const config = {
      headers: { authorization: API_KEY },
    };
    const response = await queryApi.post(
      `/`,
      {
        question: question,
        chunkLimit: settings.chunkLimit,
        synthesis: true,
        settings: {
          model: settings.model,
          temperature: settings.temperature,
          system: settings.system,
        },
      },
      config
    );
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get settings
router.get("/proxy/knowledge-base/settings/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.send(user.settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Save settings
router.put("/proxy/knowledge-base/settings/:userId", async (req, res) => {
  const settings = req.body;
  try {
    const user = await User.findById(req.params.userId);
    user.settings = settings;
    const response = await user.save();
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
