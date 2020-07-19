import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokensRepository
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {}
}
