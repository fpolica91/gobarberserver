import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/fakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

describe('ResetForgottenEmail', () => {
  it('should be able to reset forgotten password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@eample.com',
      password: '123456'
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPasswordService.execute({
      password: '123123',
      token
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });
});
