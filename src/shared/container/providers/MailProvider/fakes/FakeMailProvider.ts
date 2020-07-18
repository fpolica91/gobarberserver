import IMailProvider from '../models/IMailProvide';
import ISendMailDto from '../Dtos/ISendMailDto';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDto[] = [];

  // this is only for understading purposes.
  public async getMail(): Promise<void> {}

  public async sendMail(message: ISendMailDto): Promise<void> {
    this.messages.push(message);
  }
}
