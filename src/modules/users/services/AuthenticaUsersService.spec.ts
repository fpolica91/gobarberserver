import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import CreateSessionService from './CreateSessionService';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';

describe('CreateSession', () => {
  it('should be able to authentica user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
    const authenticateUser = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider
    );
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123'
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123123'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate a non existing user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider
    );
    expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to login with wrong password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
    const authenticateUser = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider
    );
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123'
    });

    expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong password'
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
