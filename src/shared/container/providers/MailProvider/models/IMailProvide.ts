export default interface IMailProvider {
  sendMail(to: string, body: string): Promise<void>;
  getMail(from: string, to: string): Promise<void>;
}
