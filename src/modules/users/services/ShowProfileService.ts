import User from '../infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  user_id: string;
}
@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  public async execute({ user_id }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError('User does not exist');
    delete user.password;
    return user;
  }
}
