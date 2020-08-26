/**In this service list the appointment for an specific provider. */

import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/container/providers/Cache/models/ICacheProvider';

interface IRequest {
  user_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProvidersAppointmentService {

  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }
  public async execute({
    user_id,
    month,
    year,
    day
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${user_id}:${year}-${month}-${day}`
    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey)
    if (!appointments) {
      appointments = await this.appointmentRepository.findByDayFromProvider(
        {
          user_id,
          year,
          month,
          day
        }
      );
      console.log('coming from db')
      await this.cacheProvider.save(cacheKey, appointments)
    }
    // await this.cacheProvider.save('assds', 'dagaga')
    return appointments;
  }
}
