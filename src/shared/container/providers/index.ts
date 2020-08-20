import { container } from 'tsyringe';
import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvide';
import EtherealMailProvicer from './MailProvider/implementations/EtherealMailProvider';
import mailConfig from '../../../config/mail'
import IMailTemplateProvider from './MailTemplateProvider/models/index';
import HandleBarsMailTemplate from './MailTemplateProvider/implementations/handleBarsMailTemplateProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandleBarsMailTemplate
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ses' ? container.resolve(SESMailProvider) :
    container.resolve(EtherealMailProvicer)
);
