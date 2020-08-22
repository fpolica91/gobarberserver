import { container } from 'tsyringe';
import IStorageProvider from './StorageProviders/models/IStorageProvider';
import uploadConfig from '@config/upload'
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';
import S3StorageProvider from './StorageProviders/implementations/S3StorageProvider'
import './MailTemplateProvider'
import './MailProvider'

const providers = {
  s3: S3StorageProvider,
  disk: DiskStorageProvider
}


container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver]
);

