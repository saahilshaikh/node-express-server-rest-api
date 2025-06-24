import { Router } from 'express';

const router = Router();

// Health check endpoint
router.get('/test', (req, res) => {
    console.log(JSON.stringify(req.headers));
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

router.post('/create_job', (req, res) => {
    console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));
    res.status(200).json({
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

export default router;
