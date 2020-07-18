import IMailTemplateProvider from '../models/index';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'ola kabir!';
  }
}
