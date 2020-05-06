import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../Models/User';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}

export default class SessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    /**
     * @hashedPassword is going to be the hashed password ->  user.password
     * @compare from bcryptjs compares a string and hashed string and returns boolean
     */

    const passwordMatched = await compare(password, user.password);
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
