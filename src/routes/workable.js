import { Router } from 'express';
import axios from 'axios';

const router = Router();

// * Stages * //
router.get('/stages', (req, res) => {
    axios.get(`https://${process.env.WORKABLE_SUB_DOMAIN}.workable.com/spi/v3/stages`, {
        headers: {
            'Authorization': `Bearer ${process.env.WORKABLE_API_KEY}`
        },
        params: req.query
    })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(error.status).json({ error: 'Failed to fetch stages' });
        });
});

// * Candidates * //
router.get('/candidates', (req, res) => {
    axios.get(`https://${process.env.WORKABLE_SUB_DOMAIN}.workable.com/spi/v3/candidates`, {
        headers: {
            'Authorization': `Bearer ${process.env.WORKABLE_API_KEY}`
        },
        params: req.query
    })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(error.status).json({ error: 'Failed to fetch stages' });
        });
});

// * Candidate Details * //
router.get('/candidates/:id', (req, res) => {
    axios.get(`https://${process.env.WORKABLE_SUB_DOMAIN}.workable.com/spi/v3/candidates/${req.params.id}`, {
        headers: {
            'Authorization': `Bearer ${process.env.WORKABLE_API_KEY}`
        },
    })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(error.status).json({ error: 'Failed to fetch stages' });
        });
});

// * Jobs * //
router.get('/jobs', (req, res) => {
    axios.get(`https://${process.env.WORKABLE_SUB_DOMAIN}.workable.com/spi/v3/jobs`, {
        headers: {
            'Authorization': `Bearer ${process.env.WORKABLE_API_KEY}`
        },
        params: req.query
    })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(error.status).json({ error: 'Failed to fetch stages' });
        });
});

// * Job Details * //
router.get('/jobs/:shortcode', (req, res) => {
    axios.get(`https://${process.env.WORKABLE_SUB_DOMAIN}.workable.com/spi/v3/jobs/${req.params.shortcode}`, {
        headers: {
            'Authorization': `Bearer ${process.env.WORKABLE_API_KEY}`
        },
    })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(error.status).json({ error: 'Failed to fetch stages' });
        });
});

// * Create Listener * //
router.post('/create_listener', (req, res) => {
    axios.post(`https://${process.env.WORKABLE_SUB_DOMAIN}.workable.com/spi/v3/subscriptions`, {
        headers: {
            'Authorization': `Bearer ${process.env.WORKABLE_API_KEY}`
        },
        data: req.body
    })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.log('Error---->', error);
            res.status(error.status).json({ error: 'Failed to create listener' });
        });
});

// * Candidate Created Listener * //
router.post('/listener/candidate_created', (req, res) => {
    console.log('Candidate created listener triggered---->', JSON.stringify(req.body));
    res.status(200).json({ message: 'Candidate created listener triggered', data: req.body });
});

// * Candidate Moved Listener * //
router.post('/listener/candidate_moved', (req, res) => {
    console.log('Candidate moved listener triggered---->', JSON.stringify(req.body));
    res.status(200).json({ message: 'Candidate moved listener triggered', data: req.body });
});

// * Listener * //
router.get('/listeners', (req, res) => {
    axios.get(`https://${process.env.WORKABLE_SUB_DOMAIN}.workable.com/spi/v3/subscriptions`, {
        headers: {
            'Authorization': `Bearer ${process.env.WORKABLE_API_KEY}`
        },
    })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(error.status).json({ error: 'Failed to fetch stages' });
        });
});

router.delete('/delete_listener/:id', (req, res) => {
    axios.delete(`https://${process.env.WORKABLE_SUB_DOMAIN}.workable.com/spi/v3/subscriptions/${req.params.id}`, {
        headers: {
            'Authorization': `Bearer ${process.env.WORKABLE_API_KEY}`
        },
    })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(error.status).json({ error: 'Failed to fetch stages' });
        });
});

export default router;
