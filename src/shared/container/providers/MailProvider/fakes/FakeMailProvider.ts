import IMailProvider from '../models/IMailProvide';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  // this is only for understading purposes.
  public async getMail(): Promise<void> {}

  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body
    });
  }
}
