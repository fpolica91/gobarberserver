import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmail from './SendForgotPasswordPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/fakeUserTokensRepository';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const sendForgotEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@eample.com',
      password: '123456'
    });
    await sendForgotEmail.execute({ email: 'johndoe@eample.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('it should not be able to recover a non existing user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const sendForgotEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );

    await expect(
      sendForgotEmail.execute({ email: 'johndoe@eample.com' })
    ).rejects.toBeInstanceOf(Error);
  });
  it('should generate a forgot password token', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const sendForgotEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@eample.com',
      password: '123456'
    });
    await sendForgotEmail.execute({ email: 'johndoe@eample.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});

// Must find user
//
