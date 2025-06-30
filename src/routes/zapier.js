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
            { name: 'Remote', value: 1 },
            { name: 'Hybrid', value: 2 },
            { name: 'Onsite', value: 3 },
        ],
        employmentType: [
            { name: 'Full Time', value: 1 },
            { name: 'Part Time', value: 2 },
            { name: 'Contract', value: 3 },
            { name: 'Freelance', value: 4 },
        ],
        experience: [
            { name: 'Entry Level', value: 1 },
            { name: 'Mid Level', value: 2 },
            { name: 'Senior Level', value: 3 },
            { name: 'Lead', value: 4 },
            { name: 'Manager', value: 5 },
            { name: 'Director', value: 6 },
            { name: 'Executive', value: 7 },
        ],
        desiredStartDate: [
            { name: 'ASAP (less than 7 days)', value: 1 },
            { name: 'Soon (7-15 days)', value: 2 },
            { name: 'Later (15+ days)', value: 3 },
        ],
        communicationStylePreference: [
            { name: 'Strong verbal & written communication skills essential', value: 1 },
            { name: 'Written communication prioritized for async collaboration', value: 2 },
        ],
        currency: [
            { name: '$', value: 1 },
            { name: '€', value: 2 },
            { name: '£', value: 3 },
            { name: 'C$', value: 4 },
            { name: 'A$', value: 5 },
            { name: '₹', value: 6 },
            { name: '₽', value: 7 },
            { name: 'R$', value: 8 },
        ],
        period: [
            { name: 'Hourly', value: 1 },
            { name: 'Daily', value: 2 },
            { name: 'Weekly', value: 3 },
            { name: 'Monthly', value: 4 },
            { name: 'Yearly', value: 5 },
        ],
    };

    res.status(200).json(dropdownOptions[key] || []);
});

export default router;
