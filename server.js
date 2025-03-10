import express from 'express';
import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;

// Helper function to get Zoom Access Token
async function getAccessToken() {
  const data = qs.stringify({
    grant_type: 'account_credentials',
    account_id: ACCOUNT_ID,
  });

  const config = {
    method: 'post',
    url: 'https://zoom.us/oauth/token',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token', error.response.data);
    return null;
  }
}

// API Route to schedule a Zoom meeting
app.post('/schedule-meeting', async (req, res) => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return res.status(500).send('Error getting access token');
  }

  const meetingData = {
    topic: req.body.topic || 'Scheduled Meeting',
    type: 2, // 2 means a scheduled meeting
    start_time: req.body.start_time, // e.g., '2024-09-20T15:00:00Z'
    duration: req.body.duration || 60, // Duration in minutes
    timezone: req.body.timezone || 'UTC',
    settings: {
      host_video: true,
      participant_video: true,
      mute_upon_entry: true,
    },
  };

  const config = {
    method: 'post',
    url: 'https://api.zoom.us/v2/users/me/meetings',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: meetingData,
  };

  try {
    const response = await axios(config);
    res.json({
      message: 'Meeting Scheduled Successfully',
      meetingDetails: response.data,
    });
  } catch (error) {
    console.error('Error scheduling Zoom meeting:', error.response.data);
    res.status(500).send('Error scheduling Zoom meeting');
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
