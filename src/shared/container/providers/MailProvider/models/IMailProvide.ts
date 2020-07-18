import ISendMailDto from '../Dtos/ISendMailDto';
export default interface IMailProvider {
  sendMail(data: ISendMailDto): Promise<void>;
  getMail(from: string, to: string): Promise<void>;
}
