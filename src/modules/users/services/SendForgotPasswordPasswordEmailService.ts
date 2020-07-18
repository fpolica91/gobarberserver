import { inject, injectable } from 'tsyringe';
import path from 'path';
import IUserRepository from '../repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvide';
import IUserTokensRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmail {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository
  ) {}
  public async execute({ email }: IRequest): Promise<void> {
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot-password.hbs'
    );
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new Error('User does not exist');
    const { token } = await this.userTokenRepository.generate(user.id);
    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[GoBarber] Password Recovery',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `hhtp://localhost:3000/reset?token=${token}`
        }
      }
    });
  }
}
