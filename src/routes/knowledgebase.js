const express = require("express");
const axios = require("axios");
const multer = require("multer");
const upload = multer();
const FormData = require("form-data");

const router = express.Router();
const DIALOG_MANAGER_API_KEY = process.env.DIALOG_MANAGER_API_KEY;

const knowledgebaseApi = axios.create({
  baseURL: "https://api.voiceflow.com/v3alpha/knowledge-base/docs",
  headers: {
    authorization: DIALOG_MANAGER_API_KEY,
  },
});

//Get all data sources
router.get("/proxy/knowledge-base", async (req, res) => {
  try {
    const response = await knowledgebaseApi.get("?Pagination=page=1&limit=50");
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Upload a URL
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

//Upload a File
router.post("/proxy/knowledge-base/file", upload.any(), async (req, res) => {
  const { files } = req;
  const { buffer, originalname: filename } = files[0];

  const formFile = new FormData();
  formFile.append("file", buffer, { filename });
  try {
    const response = await knowledgebaseApi.post("/upload", formFile);
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
