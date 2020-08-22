import { container } from 'tsyringe'
import HandleBarsMailTemplate from './implementations/handleBarsMailTemplateProvider';
import IMailTemplateProvider from './models/index';



container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandleBarsMailTemplate
);
