import { container } from 'tsyringe';
import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvide';
import EtherealMailProvicer from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/index';
import HandleBarsMailTemplate from './MailTemplateProvider/implementations/handleBarsMailTemplateProvider';

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
  container.resolve(EtherealMailProvicer)
);
