import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer'
import SessionService from '@modules/users/services/CreateSessionService';

export default class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const sessionService = container.resolve(SessionService);
    const { user, token } = await sessionService.execute({ email, password });
    delete user.password;
    return res.json({ user: classToClass(user), token });
  }
}
