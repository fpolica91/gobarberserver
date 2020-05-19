import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import CreateSessionService from './CreateSessionService';

describe('CreateSession', () => {
  it('should be able to authentica user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUserRepository);
    const authenticateUser = new CreateSessionService(fakeUserRepository);
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123'
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123123'
    });

    expect(response).toHaveProperty('token');
  });
});
