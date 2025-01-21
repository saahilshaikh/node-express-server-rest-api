import { Router } from 'express';
import axios from 'axios';

const router = Router();

// webhook for whatsapp message
router.get('/webhook', (req, res) => {
  console.log('Whatsapp GET BODY--->', JSON.stringify(req.body));
  console.log('Whatsapp GET QUERY--->', JSON.stringify(req.query));
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == process.env.META_VERIFY_TOKEN
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

// webhook for whatsapp message
router.post('/webhook', (req, res) => {
  console.log('POST--->', JSON.stringify(req.body));
  const from = req.body?.entry[0]?.changes[0]?.value?.metadata?.phone_number_id;
  const to = req.body?.entry[0]?.changes[0]?.value?.messages[0]?.from;
  const message = req.body?.entry[0]?.changes[0]?.value?.messages[0]?.text?.body;
  setTimeout(() => {
    sendMessage(process.env.DUMMY_MESSAGE, to, from);
  }, 1000);
  res.sendStatus(200);
});

// send message to whatsapp
async function sendMessage(message, to, from) {
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
      `https://graph.facebook.com/v${process.env.WHATSAPP_API_VERSION}/${from}/messages`,
      payload,
      config,
    );
    console.log('Whatsapp message sent successfully.');
    return { status: true, data: response.data };
  } catch (error) {
    console.log('Error sending whatsapp message!');
    return { status: false, error: error };
  }
};

export default router;
