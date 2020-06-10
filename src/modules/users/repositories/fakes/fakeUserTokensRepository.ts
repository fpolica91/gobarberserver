import { uuid } from 'uuidv4';
import IUserTokensRepository from '../IUserTokenRepository';
import UserToken from '../../infra/typeorm/entities/UserToken';

export default class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id
    });

    this.userTokens.push(userToken);

    return userToken;
  }
}
