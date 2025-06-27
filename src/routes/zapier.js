import axios from 'axios';
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

router.get('/get_org_jobs', (req, res) => {
    console.log(JSON.stringify(req.headers));
    axios.get(`https://api.dev.workforce.uktob.ai/v1/jobs?org_id=223c3ae0-9905-4968-8e85-28fd046790f5&page=1&limit=100`)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(error.status).json({ error: 'Failed to fetch stages' });
        });
});

export default router;
