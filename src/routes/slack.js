import { Router } from 'express';

const router = Router();

router.post('/saveTeamInfo', (req, res) => {
  const { team_id, org_id } = req.body;
  console.log(
    `Slack send team info trigger: team_id: ${team_id}, org_id: ${org_id}`,
  );
  return res.send({ team_id, org_id });
});

router.post('/event', (req, res) => {
  const { challenge } = req.body;
  console.log('Slack event: ', req.body);
  return res.send({ challenge });
});

export default router;
