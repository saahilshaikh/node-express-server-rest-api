import { Router } from 'express';
import axios from 'axios';

const router = Router();

// webhook for whatsapp message
router.get('/webhook', (req, res) => {
  console.log('GET--->', JSON.stringify(req.body));
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == 'UKTOB.AI'
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

// webhook for whatsapp message
router.post('/webhook', (req, res) => {
  console.log('POST--->', JSON.stringify(req.body));
  res.sendStatus(200).then(() => {
    const to = req.body?.entry?.changes[0]?.value?.messages[0]?.from;
    sendMessage(process.env.DUMMY_MESSAGE, to);
  });
});

// send message to whatsapp
async function sendMessage(message, to) {
  console.log('Sending whatsapp message to: ', to);
  let payload = {
    "messaging_product": "whatsapp",
    "to": to,
    "type": "text",
    "text": {
      "body": message
    }
  };
  const config = {
    headers: {
      Authorization: 'Bearer ' + process.env.WHATSAPP_PERMA_TOKEN,
    },
  };

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
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

export default router;
