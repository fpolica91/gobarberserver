import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmail from '@modules/users/services/SendForgotPasswordPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<void> {
    const { email } = request.body;
    const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmail);
    await sendForgotPasswordEmail.execute({ email });
    response.status(204).json();
  }
}
