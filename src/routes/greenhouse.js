import axios from 'axios';
import { Router } from 'express';

const router = Router();

// We are using this to get the api token from the environment variables
const api_token = process.env.GREENHOUSE_API_TOKEN;

// We are using this to encode the api token to base64
const credential = Buffer.from(api_token + ':').toString('base64');

// This is a temporary user id of the greenhouse admin, we will fetch the actual user id using the get users endpoint
const admin_id = '4014818009';

// We are using this to get all the jobs in the greenhouse account
router.get('/jobs', async (req, res) => {
    try {
        const response = await axios.get('https://harvest.greenhouse.io/v1/jobs', {
            headers: {
                'Authorization': `Basic ${credential}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: JSON.stringify(error.response.data) });
    }
});

// We are using this to get the job details
router.get('/jobs/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://harvest.greenhouse.io/v1/jobs/${req.params.id}`, {
            headers: {
                'Authorization': `Basic ${credential}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: JSON.stringify(error.response.data) });
    }
});

// We are using this to get all the stages in the greenhouse account
router.get('/stages', async (req, res) => {
    try {
        const response = await axios.get('https://harvest.greenhouse.io/v1/job_stages', {
            headers: {
                'Authorization': `Basic ${credential}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: JSON.stringify(error.response.data) });
    }
});

// We are using this to get all the candidates in the greenhouse account
router.get('/candidates', async (req, res) => {
    try {
        const response = await axios.get('https://harvest.greenhouse.io/v1/candidates', {
            headers: {
                'Authorization': `Basic ${credential}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: JSON.stringify(error.response.data) });
    }
});

// We are using this to get the candidate details which includes all the applications ids for a candidate
router.get('/candidates/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://harvest.greenhouse.io/v1/candidates/${req.params.id}`, {
            headers: {
                'Authorization': `Basic ${credential}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: JSON.stringify(error.response.data) });
    }
});

// We are using this to get all the applications in the greenhouse account
router.get('/applications', async (req, res) => {
    try {
        const response = await axios.get('https://harvest.greenhouse.io/v1/applications', {
            headers: {
                'Authorization': `Basic ${credential}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: JSON.stringify(error.response.data) });
    }
});

// We are using this to get the application details
router.get('/applications/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://harvest.greenhouse.io/v1/applications/${req.params.id}`, {
            headers: {
                'Authorization': `Basic ${credential}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: JSON.stringify(error.response.data) });
    }
});

// We are using this to capture events from greenhouse
router.post('/event/:id', async (req, res) => {
    console.log(`\nTime : ${new Date().toISOString()} \n${req.params.id} : \n` + JSON.stringify(req.body));
    res.status(200).json({ message: 'Event captured' });
});

// We are using this to get the user id of the greenhouse admin to move applications to a particular stage
router.get('/users', async (req, res) => {
    try {
        const response = await axios.get('https://harvest.greenhouse.io/v1/users', {
            headers: {
                'Authorization': `Basic ${credential}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: JSON.stringify(error) });
    }
});

// We are using this to move applications to a particular stage
router.post('/move-application/:id', async (req, res) => {
    const { from_stage_id, to_stage_id } = req.body;
    try {
        const payload = {
            from_stage_id: from_stage_id,
            to_stage_id: to_stage_id
        };
        const response = await axios.post(
            `https://harvest.greenhouse.io/v1/applications/${req.params.id}/move`,
            { ...payload }, // payload is the body
            {
                headers: {
                    'Authorization': `Basic ${credential}`,
                    'On-Behalf-Of': admin_id,
                    'Content-Type': 'application/json'
                }
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error.response.data);
        res.status(error.response?.status || 500).json({ error: JSON.stringify(error.response.data) });
    }
});

export default router;
