import User from '../infra/typeorm/entities/User';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  user_id: string;
  avatarFilename: string;
}

/**
 * Things to verify
 * if @user_id is from an actual user
 * @user has an avatar delete current
 *
 */

export default class UpdateUserAvatarService {
  constructor(private userRepository: IUserRepository) {}
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can upload images');
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        /**Asynchronous unlink(2) - @delete a name and possibly the file it refers to. */
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await this.userRepository.save(user);
    return user;
  }
}
