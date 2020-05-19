import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

// @EntityRepository(Appointment)
class AppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(appt =>
      isEqual(appt.date, date)
    );
    return appointment;
  }
  public async create({
    provider_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), provider_id, date });
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentRepository;
