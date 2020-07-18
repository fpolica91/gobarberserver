import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);
    if (!userToken) throw new Error('User token does not exist');

    let tokenCreateAt = userToken.created_at;
    const tokenExpirationHour = addHours(tokenCreateAt, 2);
    if (isAfter(Date.now(), tokenExpirationHour)) {
      throw new Error('invalid token');
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) throw new Error('User cannot be found');
    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);
  }
}
