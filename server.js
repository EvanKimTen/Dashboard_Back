const express = require('express');
import('node-fetch').then(fetch => {
    // Your server logic that uses fetch here
  }).catch(err => {
    console.error(err);
  });
const cors = require('cors');


const app = express();
app.use(express.json());
const port = 5001;

// Enable CORS to allow cross-origin requests
app.use(cors());

// Define a route to handle the specific request
app.post('/api/proxy/top_intents', async (req, res) => {
  try {
    // Define the options for the external API request
    const { startTime, endTime } = req.body.query[0].filter;

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'VF.DM.64dd84f8aa29af0007d92da9.1TU4erAlbnpyi3bB'
      },
      body: JSON.stringify({
        query: [
          {
            name: 'top_intents',
            filter: {
              projectID: '64dd84f8aa29af0007d92d9d',
              startTime,
              endTime,
              limit: 3
            }
          }
        ]
      })
    };

    // Make the external API request
    const externalApiUrl = 'https://analytics-api.voiceflow.com/v1/query/usage';
    const response = await fetch(externalApiUrl, options);

    // Check if the response status code is 200 (OK)
    if (response.status === 200) {
      const responseData = await response.json();
      console.log(responseData); // Log the response data for debugging
      res.json(responseData);
    } else {
      console.error('External API Request Failed with Status:', response.status);
      res.status(500).json({ error: 'External API request failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  app.post('/api/proxy/understood_messages', async (req, res) => {
    try {
      // Define the options for the external API request
      const { startTime, endTime } = req.body.query[0].filter;

      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'VF.DM.64dd84f8aa29af0007d92da9.1TU4erAlbnpyi3bB'
        },
        body: JSON.stringify({
          query: [
            {
              name: 'understood_messages',
              filter: {
                projectID: '64dd84f8aa29af0007d92d9d',
                startTime,
                endTime,
              }
            }
          ]
        })
      };

      // Make the external API request
      const externalApiUrl = 'https://analytics-api.voiceflow.com/v1/query/usage';
      const response = await fetch(externalApiUrl, options);

      // Check if the response status code is 200 (OK)
      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData); // Log the response data for debugging
        res.json(responseData);
      } else {
        console.error('External API Request Failed with Status:', response.status);
        res.status(500).json({ error: 'External API request failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/proxy/interactions', async (req, res) => {
    try {
      // Define the options for the external API request
      const { startTime, endTime } = req.body.query[0].filter;

      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'VF.DM.64dd84f8aa29af0007d92da9.1TU4erAlbnpyi3bB'
        },
        body: JSON.stringify({
          query: [
            {
              name: 'interactions',
              filter: {
                projectID: '64dd84f8aa29af0007d92d9d',
                startTime,
                endTime
              }
            }
          ]
        })
      };
  
      // Make the external API request
      const externalApiUrl = 'https://analytics-api.voiceflow.com/v1/query/usage';
      const response = await fetch(externalApiUrl, options);
  
      // Check if the response status code is 200 (OK)
      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData); // Log the response data for debugging
        res.json(responseData);
      } else {
        console.error('External API Request Failed with Status:', response.status);
        res.status(500).json({ error: 'External API request failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/proxy/users', async (req, res) => {
    try {
      // Define the options for the external API request
      const { startTime, endTime } = req.body.query[0].filter;

      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'VF.DM.64dd84f8aa29af0007d92da9.1TU4erAlbnpyi3bB'
        },
        body: JSON.stringify({
          query: [
            {
              name: 'unique_users',
              filter: {
                projectID: '64dd84f8aa29af0007d92d9d',
                startTime,
                endTime
              }
            }
          ]
        })
      };
  
      // Make the external API request
      const externalApiUrl = 'https://analytics-api.voiceflow.com/v1/query/usage';
      const response = await fetch(externalApiUrl, options);
  
      // Check if the response status code is 200 (OK)
      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData); // Log the response data for debugging
        res.json(responseData);
      } else {
        console.error('External API Request Failed with Status:', response.status);
        res.status(500).json({ error: 'External API request failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/proxy/sessions', async (req, res) => {
    try {
      // Define the options for the external API request
      const { startTime, endTime } = req.body.query[0].filter;

      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'VF.DM.64dd84f8aa29af0007d92da9.1TU4erAlbnpyi3bB'
        },
        body: JSON.stringify({
          query: [
            {
              name: 'sessions',
              filter: {
                projectID: '64dd84f8aa29af0007d92d9d',
                startTime,
                endTime
              }
            }
          ]
        })
      };
  
      // Make the external API request
      const externalApiUrl = 'https://analytics-api.voiceflow.com/v1/query/usage';
      const response = await fetch(externalApiUrl, options);
  
      // Check if the response status code is 200 (OK)
      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData); // Log the response data for debugging
        res.json(responseData);
      } else {
        console.error('External API Request Failed with Status:', response.status);
        res.status(500).json({ error: 'External API request failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
  });