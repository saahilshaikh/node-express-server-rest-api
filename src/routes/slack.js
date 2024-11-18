import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';

const router = Router();

router.post('/saveTeamInfo', (req, res) => {
  const { team_id, org_id } = req.body;
  console.log(team_id, org_id);
  return res.send({ team_id, org_id });
});

export default router;
