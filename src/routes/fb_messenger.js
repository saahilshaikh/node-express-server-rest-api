import { Router } from 'express';
import axios from 'axios';

const router = Router();

// webhook for fb messenger
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

// webhook for fb messenger
router.post('/webhook', (req, res) => {
  console.log('POST--->', JSON.stringify(req.body));
  res.sendStatus(200);
});

export default router;
