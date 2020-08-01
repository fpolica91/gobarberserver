import 'reflect-metadata';
import { startOfHour, isBefore } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  provider_id: string;
  date: Date;
  user_id: string;
}

/**
 * Dependecy Inversion(SOLID)
 * Each service has one responsibility
 * this particular service imports the created AppointmentRepository
 * using the method getCustomRepository from typeorm we can use it.
 */
@injectable()
class CreateAppointmentService {
  // the appointmentRepository we are now using is the one created, iAppointmentRepository.
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ) {}
  public async execute({
    date,
    provider_id,
    user_id
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('you cannot schedule an appointment on a past date');
    }

    const booked = await this.appointmentRepository.findByDate(appointmentDate);
    if (booked) {
      throw new AppError('this appointment is already booked');
    }
    const appointment = this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
      user_id
    });
    return appointment;
  }
}

export default CreateAppointmentService;
