import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmail from './SendForgotPasswordPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider
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
});
