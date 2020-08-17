import { injectable, inject } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'
import aws from 'aws-sdk'
import IMailProvider from '../models/IMailProvide';
import IMailTemplateProvider from '../../MailTemplateProvider/models/index';
import ISendMailDto from '../Dtos/ISendMailDto';
import MailConfig from '@config/mail'


@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-2'
      })
    })
  }
  public async getMail(): Promise<void> { }

  public async sendMail({ to, from, subject, templateData }: ISendMailDto) {
    const { defaults } = MailConfig
    await this.client.sendMail({
      from: {
        name: from?.name || defaults.from.name,
        address: from?.email || defaults.from.email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    });
  }
}
