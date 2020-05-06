import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../Models/User';
import AppError from '../errors/AppError';
interface Request {
  name: string;
  email: string;
  password: string;
}

export default class UserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserEmail = await usersRepository.findOne({
      where: { email }
    });

    if (checkUserEmail) {
      throw new AppError('Email address already in use!');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await usersRepository.save(user);
    return user;
  }
}
