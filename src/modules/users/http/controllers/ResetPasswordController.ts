import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '../../services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;
    const resetPasswordService = container.resolve(ResetPasswordService);
    await resetPasswordService.execute({ password, token });
    return res.status(204).json();
  }
}
