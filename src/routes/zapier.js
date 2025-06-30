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
    console.log(JSON.stringify(req.query));
    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 10;
    axios.get(`https://api.dev.workforce.uktob.ai/v1/jobs?org_id=223c3ae0-9905-4968-8e85-28fd046790f5&page=${page + 1}&limit=${limit}`)
        .then(response => {
            console.log(response.data.total_records);
            const jobs = response?.data?.jobs || [];
            res.status(200).json(jobs);
        })
        .catch(error => {
            res.status(error.status).json({ error: 'Failed to fetch stages' });
        });
});

router.post('/create_job_linked_interview', (req, res) => {
    console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));
    res.status(200).json({
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        status: 'success',
    });
});

router.get('/dropdown_options', (req, res) => {
    const { key } = req.query;
    const dropdownOptions = {
        location: [
            { id: 1, name: 'Remote' },
            { id: 2, name: 'Hybrid' },
            { id: 3, name: 'Onsite' },
        ],
        employmentType: [
            { id: 1, name: 'Full Time' },
            { id: 2, name: 'Part Time' },
            { id: 3, name: 'Contract' },
            { id: 4, name: 'Freelance' },
        ],
        experience: [
            { id: 1, name: 'Entry Level' },
            { id: 2, name: 'Mid Level' },
            { id: 3, name: 'Senior Level' },
            { id: 4, name: 'Lead' },
            { id: 5, name: 'Manager' },
            { id: 6, name: 'Director' },
            { id: 7, name: 'Executive' },
        ],
        desiredStartDate: [
            { id: 1, name: 'ASAP (less than 7 days)' },
            { id: 2, name: 'Soon (7-15 days)' },
            { id: 3, name: 'Later (15+ days)' },
        ],
        communicationStylePreference: [
            { id: 1, name: 'Strong verbal & written communication skills essential' },
            { id: 2, name: 'Written communication prioritized for async collaboration' },
        ],
        currency: [
            { id: 1, name: '$' },
            { id: 2, name: '€' },
            { id: 3, name: '£' },
            { id: 4, name: 'C$' },
            { id: 5, name: 'A$' },
            { id: 6, name: '₹' },
            { id: 7, name: '₽' },
            { id: 8, name: 'R$' },
        ],
        period: [
            { id: 1, name: 'Hourly' },
            { id: 2, name: 'Daily' },
            { id: 3, name: 'Weekly' },
            { id: 4, name: 'Monthly' },
            { id: 5, name: 'Yearly' },
        ],
    };

    res.status(200).json(dropdownOptions[key] || []);
});

export default router;
