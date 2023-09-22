const express = require("express");
const router = express.Router();
const getUserKeys = require("../middleware/getUserKeys");


// Define a route to handle the specific request
router.post("/api/proxy/top_intents/:userId", async (req, res) => {
  try {
    // Define the options for the external API request
    const { startTime, endTime } = req.body.query[0].filter;
    const { API_KEY, PROJECT_ID } = await getUserKeys(req.params.userId);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: API_KEY,
      },
      body: JSON.stringify({
        query: [
          {
            name: "top_intents",
            filter: {
              projectID: PROJECT_ID,
              startTime,
              endTime,
              limit: 5,
            },
          },
        ],
      }),
    };

    // Make the external API request
    const externalApiUrl = "https://analytics-api.voiceflow.com/v1/query/usage";
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

router.post("/api/proxy/understood_messages/:userId", async (req, res) => {
  try {
    // const keys = getKeys();
    // const API_KEY = keys[0];
    // const PROJECT_ID = keys[1];
    // Define the options for the external API request
    const { startTime, endTime } = req.body.query[0].filter;
    const { API_KEY, PROJECT_ID } = await getUserKeys(req.params.userId);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: API_KEY,
      },
      body: JSON.stringify({
        query: [
          {
            name: "understood_messages",
            filter: {
              projectID: PROJECT_ID,
              startTime,
              endTime,
            },
          },
        ],
      }),
    };

    // Make the external API request
    const externalApiUrl = "https://analytics-api.voiceflow.com/v1/query/usage";
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

router.post("/api/proxy/interactions/:userId", async (req, res) => {
  try {
    // const keys = getKeys();
    // const API_KEY = keys[0];
    // const PROJECT_ID = keys[1];
    // Define the options for the external API request
    const { startTime, endTime } = req.body.query[0].filter;
    const { API_KEY, PROJECT_ID } = await getUserKeys(req.params.userId);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: API_KEY,
      },
      body: JSON.stringify({
        query: [
          {
            name: "interactions",
            filter: {
              projectID: PROJECT_ID,
              startTime,
              endTime,
            },
          },
        ],
      }),
    };

    // Make the external API request
    const externalApiUrl = "https://analytics-api.voiceflow.com/v1/query/usage";
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

router.post("/api/proxy/users/:userId", async (req, res) => {
  try {
    // const keys = getKeys();
    // const API_KEY = keys[0];
    // const PROJECT_ID = keys[1];
    // Define the options for the external API request
    const { startTime, endTime } = req.body.query[0].filter;
    const { API_KEY, PROJECT_ID } = await getUserKeys(req.params.userId);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: API_KEY,
      },
      body: JSON.stringify({
        query: [
          {
            name: "unique_users",
            filter: {
              projectID: PROJECT_ID,
              startTime,
              endTime,
            },
          },
        ],
      }),
    };

    // Make the external API request
    const externalApiUrl = "https://analytics-api.voiceflow.com/v1/query/usage";
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

router.post("/api/proxy/sessions/:userId", async (req, res) => {
  try {
    // const keys = getKeys();
    // const API_KEY = keys[0];
    // const PROJECT_ID = keys[1];
    // Define the options for the external API request
    const { startTime, endTime } = req.body.query[0].filter;
    const { API_KEY, PROJECT_ID } = await getUserKeys(req.params.userId);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: API_KEY,
      },
      body: JSON.stringify({
        query: [
          {
            name: "sessions",
            filter: {
              projectID: PROJECT_ID,
              startTime,
              endTime,
            },
          },
        ],
      }),
    };

    // Make the external API request
    const externalApiUrl = "https://analytics-api.voiceflow.com/v1/query/usage";
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
