import { Router } from 'express';
import { container } from 'tsyringe';
const sessionRouter = Router();
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import SessionService from '@modules/users/services/CreateSessionService';

sessionRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const sessionService = container.resolve(SessionService);
  const { user, token } = await sessionService.execute({ email, password });
  delete user.password;
  return res.json({ user, token });
});

export default sessionRouter;
