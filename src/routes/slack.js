import { Router } from 'express';
import axios from 'axios';

const router = Router();

// connect raya to slack
router.post('/saveTeamInfo', (req, res) => {
  const { slack_team_id, org_id } = req.body;
  console.log(
    `Slack send team info trigger: slack_team_id: ${slack_team_id}, org_id: ${org_id}`,
  );
  return res.send({ slack_team_id, org_id });
});

// slack command listener
router.post('/command', (req, res) => {
  console.log('Slack command: ', req.body);
  let message = {
    "response_type": "in_channel",
    "text": process.env.DUMMY_MESSAGE,
  }
  return res.send({ message });
});

// slack event listener
router.post('/event', (req, res) => {
  const { challenge, event: { channel } } = req.body;
  console.log('Slack event: ', req.body);
  sendMessage(process.env.DUMMY_MESSAGE, channel);
  return res.send({ challenge });
});


// send message to slack channel
async function sendMessage(message, channel_id) {
  console.log('Sending message to Slack channel: ', channel_id);
  let payload = {
    text: message,
    channel: channel_id,
  };
  const config = {
    headers: {
      Authorization: 'Bearer ' + process.env.PARAGON_TOKEN,
    },
  };

  try {
    const response = await axios.post(
      `https://proxy.useparagon.com/projects/${process.env.PARAGON_PROJECT_ID}/sdk/proxy/slack/chat.postMessage`,
      payload,
      config,
    );
    console.log('Slack message sent successfully.');
    return { status: true, data: response.data };
  } catch (error) {
    console.log('Error sending message to Slack!');
    return { status: false, error: error };
  }
};

// disconnect raya from slack
router.post('/disconnect', (req, res) => {
  const { org_id } = req.body;
  console.log(`Slack disconnect trigger for org_id: ${org_id}`);
  return res.send({ org_id });
});

export default router;
