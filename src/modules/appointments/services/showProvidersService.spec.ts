import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ShowProviderService from './ShowProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let showProviderService: ShowProviderService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProviderService = new ShowProviderService(fakeUsersRepository);
  });
  it('should show the user profile', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'john@doe.com',
      password: '123123'
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Joe three',
      email: 'john@three.com',
      password: '123456'
    });

    const loggedUsr = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'logged@user.com',
      password: '123123'
    });

    const providers = await showProviderService.execute(loggedUsr.id);

    expect(providers).toEqual([user1, user2]);
  });
});
