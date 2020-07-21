import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindProvidersDTO from '../dtos/IFindProvidersdto';

export default interface IUsersRepository {
  findAllProviders({ except_user_id }: IFindProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User | undefined>;
}
