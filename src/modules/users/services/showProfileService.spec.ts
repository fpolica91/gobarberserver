import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '../../../shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });
  it('should show the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'othello',
      email: 'othello@admin.com',
      password: '123123'
    });

    const newUser = await showProfileService.execute({ user_id: user.id });

    expect(newUser.name).toBe('othello');
    expect(newUser.email).toBe('othello@admin.com');
  });

  it('should not show a user that does not exist', async () => {
    await expect(
      showProfileService.execute({ user_id: 'non-existing-user-id' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
