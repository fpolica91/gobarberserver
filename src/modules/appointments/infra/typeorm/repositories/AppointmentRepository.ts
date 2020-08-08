import { getRepository, Repository, Raw } from 'typeorm';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProvider from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindInDayForProviderDTO from '../../../dtos/IFindInDayForProviderDto';

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
    date,
    user_id
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      user_id,
      provider_id,
      date
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async findByMonthFromProvider({
    user_id,
    month,
    year
  }: IFindAllInMonthFromProvider): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = this.ormRepository.find({
      where: {
        provider_id: user_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName},'MM-YYYY') = '${parsedMonth}-${year}' `
        )
      }
    });

    return appointments;
  }

  public async findByDayFromProvider({
    user_id,
    month,
    day,
    year
  }: IFindInDayForProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');
    const appointments = this.ormRepository.find({
      where: {
        provider_id: user_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName},'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}' `
        )
      }
    });

    return appointments;
  }
}

export default AppointmentRepository;
