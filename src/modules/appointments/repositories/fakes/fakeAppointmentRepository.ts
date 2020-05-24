import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

/**
 * @liskov substituion principle
 * @removed extends Repository
 */

// @EntityRepository(Appointment)
class AppointmentRepository implements IAppointmentRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {}
  public async create({
    provider_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {}
}

export default AppointmentRepository;
