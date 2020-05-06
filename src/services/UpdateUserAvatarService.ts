import { getRepository } from 'typeorm';
import User from '../Models/User';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

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
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);
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
    await userRepository.save(user);
    return user;
  }
}
