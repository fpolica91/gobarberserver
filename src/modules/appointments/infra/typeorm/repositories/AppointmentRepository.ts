import { getRepository, Repository } from 'typeorm';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

/**
 * @liskov substituion principle
 * @removed extends Repository
 */

// @EntityRepository(Appointment)
class AppointmentRepository implements IAppointmentRepository {

  /**
   * @ormRepository is the typography of the repository we will be creating
   */
  private ormRepository: Repository<Appointment>;
  constructor() {
     /**
   * @getRepository creates an instance of the repository
   */
    this.ormRepository = getRepository(Appointment);
  }
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date }
    });
    return findAppointment || undefined;
  }
  public async create({
    provider_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appointment);
    return appointment;
  }
}

export default AppointmentRepository;
