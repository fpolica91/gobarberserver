import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import AppError from '../../../shared/errors/AppError';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });
  it('should be able to update a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'othello',
      email: 'othello@admin.com',
      password: '123123'
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Othello Antonio',
      email: 'Othello@admin1.com'
    });

    expect(updatedUser.name).toBe('Othello Antonio');
    expect(updatedUser.email).toBe('Othello@admin1.com');
  });

  it('should not be able to update to an existing email', async () => {
    await fakeUsersRepository.create({
      name: 'othello Felipe',
      email: 'example@dot.com',
      password: '123123'
    });

    const user = await fakeUsersRepository.create({
      name: 'othello',
      email: 'othello@admin.com',
      password: '123123'
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Othello Antonio',
        email: 'example@dot.com'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
