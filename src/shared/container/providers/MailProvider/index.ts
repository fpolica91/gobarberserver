import { container } from 'tsyringe'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvide';
import EtherealMailProvicer from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';
import MailConfig from '@config/mail';


const providers = {
  ethereal: container.resolve(EtherealMailProvicer),
  ses: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[MailConfig.driver]
)
