import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/Cache/models/ICacheProvider';

@injectable()
export default class ShowProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }
  public async execute(user_id: string): Promise<User[]> {
    // check for cached users first
    let users = await this.cacheProvider.recover<User[]>(`providers-list:${user_id}`)
    //if not cache users run db query
    if (!users) {
      users = await this.userRepository.findAllProviders({
        except_user_id: user_id
      });
    }

    // save users to redis
    await this.cacheProvider.save(`providers-list:${user_id}`, users)

    return users;
  }
}
