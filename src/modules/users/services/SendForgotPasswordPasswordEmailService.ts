import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvide';
import IUserTokensRepository from '../repositories/IUserTokenRepository';
// import AppError from '@shared/errors/AppError';
// import User from '../infra/typeorm/entities/User';

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

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokensRepository
  ) {}
  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new Error('User does not exist');
    await this.userTokenRepository.generate(user.id);
    this.mailProvider.sendMail(email, 'Recovery of email');
  }
}
