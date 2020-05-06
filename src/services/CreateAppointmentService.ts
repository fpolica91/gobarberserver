import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../Models/Appointment';
import AppointmentRepository from '../Repository/AppointmentRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

/**
 * Dependecy Inversion(SOLID)
 * Each service has one responsibility
 * this particular service imports the created AppointmentRepository
 * using the method getCustomRepository from typeorm we can use it.
 */

class CreateAppointmentService {
  public async execute({
    date,
    provider_id
  }: RequestDTO): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointmentDate = startOfHour(date);
    const booked = await appointmentRepository.findByDate(appointmentDate);
    if (booked) {
      throw new AppError('this appointment is already booked');
    }
    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate
    });
    await appointmentRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
