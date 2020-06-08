import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvide';

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
    private mailProvider: IMailProvider
  ) {}
  public async execute({}: IRequest): Promise<void> {}
}
