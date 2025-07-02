import { Router } from 'express';

const router = Router();

router.post('/submit_interview', (req, res) => {
    console.log(JSON.stringify(req.body));
    res.status(200).json({
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        status: 'success',
    });
});

export default router;