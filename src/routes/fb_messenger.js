import { Router } from 'express';
import axios from 'axios';

const router = Router();

// webhook for fb messenger
router.get('/webhook', (req, res) => {
  console.log('GET--->', JSON.stringify(req.body));
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == process.env.META_VERIFY_TOKEN
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

// webhook for fb messenger
router.post('/webhook', (req, res) => {
  console.log('POST--->', JSON.stringify(req.body));
  const to = req.body?.entry[0]?.messaging[0]?.sender?.id;
  const pageId = req.body?.entry[0]?.id;
  const message = req.body?.entry[0]?.messaging[0]?.message?.text;
  setTimeout(() => {
    sendMessage(process.env.DUMMY_MESSAGE, to, pageId);
  }, 1000);
  res.sendStatus(200);
});

async function sendMessage(message, to, pageId) {
  console.log('Sending whatsapp message to: ', to);
  const fd = new FormData();
  let recipient = {
    id: to
  };
  let messageData = {
    text: message
  };
  fd.append("recipient", JSON.stringify(recipient));
  fd.append("messaging_type", "RESPONSE");
  fd.append("message", JSON.stringify(messageData));
  fd.append("access_token", process.env.MESSENGER_PAGE_TOKEN);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v${process.env.MESSENGER_API_VERSION}/${pageId}/messages`,
      fd,
      config,
    );
    console.log('Facebook messenger message sent successfully.');
    return { status: true, data: response.data };
  } catch (error) {
    console.log('Error sending facebook messenger message!', error);
    return { status: false, error: error };
  }
};

export default router;
