import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/saveTeamInfo', (req, res) => {
  const { team_id, org_id } = req.body;
  console.log(
    `Slack send team info trigger: team_id: ${team_id}, org_id: ${org_id}`,
  );
  return res.send({ team_id, org_id });
});

router.post('/event', (req, res) => {
  const { challenge, event: { channel } } = req.body;
  console.log('Slack event: ', req.body);
  sendMessage(process.env.DUMMY_MESSAGE, channel);
  return res.send({ challenge });
});

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
}

export default router;
