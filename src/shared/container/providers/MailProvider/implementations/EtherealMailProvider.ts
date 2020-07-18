import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '../models/IMailProvide';
import ISendMailDto from '../Dtos/ISendMailDto';
import IMailTemplateProvider from '../../MailTemplateProvider/models/index';

interface IMessage {
  to: string;
  body: string;
}

@injectable()
export default class EtherealMailProvicer implements IMailProvider {
  private client: Transporter;
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    const account = nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
      this.client = transporter;
    });
  }

  // this is only for understading purposes.
  public async getMail(): Promise<void> {}

  public async sendMail({
    to,
    from,
    subject,
    templateData
  }: ISendMailDto): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Team GoBarber',
        address: from?.email || 'team@gobarber.com'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    });
    console.log(nodemailer.getTestMessageUrl(message));
  }
}
