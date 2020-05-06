import { Router } from 'express';
const sessionRouter = Router();
import SessionService from '../services/CreateSessionService';

sessionRouter.post('/', async (req, res) => {
  const sessionService = new SessionService();
  const { email, password } = req.body;
  const { user, token } = await sessionService.execute({ email, password });
  delete user.password;
  return res.json({ user, token });
});

export default sessionRouter;
