import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProvider from '../../dtos/IFindAllInMonthFromProviderDTO';
import IFindInDayForProviderDTO from '../../dtos/IFindInDayForProviderDto';

// @EntityRepository(Appointment)
class FakeAppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByMonthFromProvider({
    user_id,
    month,
    year
  }: IFindAllInMonthFromProvider): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === user_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );

    return appointments;
  }
  public async findByDayFromProvider({
    user_id,
    year,
    month,
    day
  }: IFindInDayForProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === user_id &&
        getMonth(appointment.date) + 1 === month &&
        getDate(appointment.date) === day &&
        getYear(appointment.date) === year
    );

    return appointments;
  }

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(appt =>
      isEqual(appt.date, date) &&
      appt.provider.id === provider_id
    );
    return appointment;
  }
  public async create({
    provider_id,
    date,
    user_id
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), provider_id, date, user_id });
    this.appointments.push(appointment);
    return appointment;
  }
}

export default FakeAppointmentRepository;
