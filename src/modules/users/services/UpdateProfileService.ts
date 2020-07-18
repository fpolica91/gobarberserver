import User from '../infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  user_id: string;
  email: string;
  name: string;
  old_password?: string;
  password?: string;
}
@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password
  }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError('User does not exist');
    const emailAlreadyInUse = await this.userRepository.findByEmail(email);
    if (emailAlreadyInUse && emailAlreadyInUse.id !== user_id) {
      throw new AppError('This email is already in use!');
    }
    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Please enter the old password');
    }

    if (password && old_password) {
      const checkPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      );
      if (!checkPassword) {
        throw new AppError('The old pasword is incorrect!');
      }
      user.password = await this.hashProvider.generateHash(password);
    }

    await this.userRepository.save(user);
    return user;
  }
}
