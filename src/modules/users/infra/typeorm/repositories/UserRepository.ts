// @EntityRepository(Appointment)
import { Repository, getRepository, Not } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import User from '../entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindProvidersDTO from '../../../dtos/IFindProvidersdto';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findAllProviders({
    except_user_id
  }: IFindProvidersDTO): Promise<User[]> {
    let users: User[];
    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id)
        }
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User | undefined> {
    const _user = await this.ormRepository.save(user);
    return _user;
  }
}

export default UsersRepository;
