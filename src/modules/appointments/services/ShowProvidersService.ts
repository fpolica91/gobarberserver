import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';

@injectable()
export default class ShowProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  public async execute(user_id: string): Promise<User[]> {
    const users = await this.userRepository.findAllProviders({
      except_user_id: user_id
    });

    return users;
  }
}
