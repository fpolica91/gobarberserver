import { uuid } from 'uuidv4';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '../../infra/typeorm/entities/User';
import IFindProvidersDTO from '../../dtos/IFindProvidersdto';
class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];
  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }
  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), ...data });
    this.users.push(user);
    return user;
  }
  public async findAllProviders({
    except_user_id
  }: IFindProvidersDTO): Promise<User[]> {
    let { users } = this;
    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }
    return users;
  }
  public async save(user: User): Promise<User | undefined> {
    const index = this.users.findIndex(u => u.id === user.id);
    this.users[index] = user;
    return user;
  }
}

export default FakeUsersRepository;
