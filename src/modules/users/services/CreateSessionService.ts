import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}

@injectable()
export default class SessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}
  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    /**
     * @hashedPassword is going to be the hashed password ->  user.password
     * @compare from bcryptjs compares a string and hashed string and returns boolean
     */

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jtw;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });

    // if it makes it to here, user is authenticated
    return {
      user,
      token
    };
  }
}
