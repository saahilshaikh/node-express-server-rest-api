import { Router } from 'express';
import axios from 'axios';

const router = Router();

// webhook for instagram messenger
router.get('/webhook', (req, res) => {
  console.log('GET--->', JSON.stringify(req.body));
  console.log('GET--->', JSON.stringify(req.query));
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == process.env.META_VERIFY_TOKEN
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

// webhook for instagram messenger
router.post('/webhook', (req, res) => {
  console.log('POST--->', JSON.stringify(req.body));
  const to = req.body?.entry[0]?.messaging[0]?.sender?.id;
  const instagramAccountId = req.body?.entry[0]?.id;
  const message = req.body?.entry[0]?.messaging[0]?.message?.text;
  const isEchoMessage = Boolean(req.body?.entry[0]?.messaging[0]?.message?.is_echo)
  if (!isEchoMessage) {
    sendMessage(process.env.DUMMY_MESSAGE, to, instagramAccountId);
  } else {
    console.log('Message echo triggered!');
  }
  res.sendStatus(200);
});

async function sendMessage(message, to, instagramAccountId) {
  console.log('Sending instagram message to: ', to);
  const fd = new FormData();
  let recipient = {
    id: to
  };
  let messageData = {
    text: message
  };

  let payload = {
    recipient,
    message: messageData
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.INSTAGRAM_ACCOUNT_TOKEN
    },
  };

  try {
    const response = await axios.post(
      `https://graph.instagram.com/v${process.env.INSTRAGRAM_API_VERSION}/${instagramAccountId}/messages`,
      payload,
      config,
    );
    console.log('instagram messenger message sent successfully.');
    return { status: true, data: response.data };
  } catch (error) {
    console.log('Error sending instagram messenger message!', error);
    return { status: false, error: error };
  }
};

export default router;
