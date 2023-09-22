const express = require("express");
const router = express.Router();
const getUserKeys = require("../middleware/getUserKeys");

// Define a route to handle the specific request
router.post("/api/proxy/transcriptID/:userId", async (req, res) => {
  try {
    // Define the options for the external API request
    const { API_KEY, PROJECT_ID } = await getUserKeys(req.params.userId);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: API_KEY
        }
    };

    // Make the external API request
    
    const externalApiUrl = `https://api.voiceflow.com/v2/transcripts/${PROJECT_ID}`;

    const response = await fetch(externalApiUrl, options);

    // Check if the response status code is 200 (OK)
    if (response.status === 200) {
      const responseData = await response.json();
      res.json(responseData);
    } else {
      console.error(
        "External API Request Failed with Status:",
        response.status
      );
      res.status(500).json({ error: "External API request failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/api/proxy/dialog/:userId", async (req, res) => {
    try {
      const { ID } = req.body.query[0].filter;
      const { API_KEY, PROJECT_ID } = await getUserKeys(req.params.userId);
  
      const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_KEY
          }
      };
  
      // Make the external API request
      const externalApiUrl = `https://api.voiceflow.com/v2/transcripts/${PROJECT_ID}/${ID}`;
      const response = await fetch(externalApiUrl, options);
  
      // Check if the response status code is 200 (OK)
      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData); // Log the response data for debugging
        res.json(responseData);
      } else {
        console.error(
          "External API Request Failed with Status:",
          response.status
        );
        res.status(500).json({ error: "External API request failed" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


module.exports = router;
