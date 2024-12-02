import { Router } from 'express';
import axios from 'axios';

const router = Router();

// Health check endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

export default router;
