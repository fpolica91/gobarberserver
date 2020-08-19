/**In this service list the appointment for an specific provider. */

import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

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
    private appointmentRepository: IAppointmentRepository
  ) {}
  public async execute({
    user_id,
    month,
    year,
    day
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findByDayFromProvider(
      {
        user_id,
        year,
        month,
        day
      }
    );
    return appointments;
  }
}
