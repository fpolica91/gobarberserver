import { Router } from 'express';
const sessionRouter = Router();
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import SessionService from '@modules/users/services/CreateSessionService';

sessionRouter.post('/', async (req, res) => {
  const userRepository = new UserRepository();
  const { email, password } = req.body;
  const sessionService = new SessionService(userRepository);
  const { user, token } = await sessionService.execute({ email, password });
  delete user.password;
  return res.json({ user, token });
});

export default sessionRouter;
