import { container } from 'tsyringe';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository
);

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);

/**
 * @dependency injection
 * to avoid having to pass the repo manually we use tsyringe
 * this container must be  imported into server.ts
 */
