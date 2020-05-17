import { container } from 'tsyringe';
import IHashProvider from './HashProvider/models/IHashProvider';
import BcryptHashProvider from './HashProvider/implementations/BcrypthashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
