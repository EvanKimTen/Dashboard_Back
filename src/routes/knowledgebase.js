const express = require("express");
const axios = require("axios");
const multer = require("multer");
const upload = multer();
const FormData = require("form-data");
const mongoose = require("mongoose");

const router = express.Router();
// const { APIKey } = require("../server.js");
const User = require("../models/User");
const APIKey = process.env.DIALOG_MANAGER_API_KEY;

const knowledgebaseApi = axios.create({
  baseURL: "https://api.voiceflow.com/v3alpha/knowledge-base/docs",
  headers: {
    authorization: APIKey,
  },
});

const queryApi = axios.create({
  baseURL: "https://general-runtime.voiceflow.com/knowledge-base/query",
  headers: {
    authorization: APIKey,
  },
});

//Get all data sources
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

//Upload a File
router.post("/proxy/knowledge-base/file", upload.any(), async (req, res) => {
  const { files } = req;
  const { buffer, originalname: filename } = files[0];

  const formFile = new FormData();
  formFile.append("file", buffer, { filename });
  try {
    const response = await managementApi.post("/upload", formFile);
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete document
router.delete("/proxy/knowledge-base/:documentID", async (req, res) => {
  try {
    const response = await managementApi.delete(`/${req.params.documentID}`);
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//AI Preview
router.post("/proxy/knowledge-base/preview", async (req, res) => {
  const { question, settings } = req.body;
  try {
    const response = await queryApi.post(`/`, {
      question: question,
      chunkLimit: settings.chunkLimit,
      synthesis: true,
      settings: {
        model: settings.model,
        temperature: settings.temperature,
        system: settings.system,
      },
    });
    console.log(response);
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Save AI Settings
router.get("/proxy/knowledge-base/settings/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.send(user.settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Save AI Settings
router.put("/proxy/knowledge-base/settings/:userId", async (req, res) => {
  const settings = req.body;
  try {
    const user = await User.findById(req.params.userId);
    user.settings = settings;
    const response = await user.save();
    console.log(response);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
