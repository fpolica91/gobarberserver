import { hash } from 'bcryptjs';
import IUserRepository from '../repositories/IUserRepository';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class UserService {
  constructor(private usersRepository: IUserRepository) {}
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserEmail = await this.usersRepository.findByEmail(email);

    if (checkUserEmail) {
      throw new AppError('Email address already in use!');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    return user;
  }
}
