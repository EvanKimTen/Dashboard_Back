const express = require("express");
const axios = require("axios");

const router = express.Router();
const DIALOG_MANAGER_API_KEY = process.env.API_KEY;

const knowledgebaseApi = axios.create({
  baseURL: "https://api.voiceflow.com/v3alpha/knowledge-base/docs",
  headers: {
    "Content-Type": "application/json",
    authorization: DIALOG_MANAGER_API_KEY,
  },
});

router.get("/proxy/knowledge-base", async (req, res) => {
  try {
    const response = await knowledgebaseApi.get("/");
    console.log(response.data);
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/proxy/knowledge-base", async (req, res) => {
  const { url } = req.body;
  console.log(url);
  try {
    const response = await knowledgebaseApi.post("/upload", {
      data: {
        type: "url",
        url: url,
        name: url,
      },
    });
    console.log(response.data);
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;