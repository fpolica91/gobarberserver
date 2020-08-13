import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProvider from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindInDayForProviderDTO from '../dtos/IFindInDayForProviderDto';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByMonthFromProvider(
    data: IFindAllInMonthFromProvider
  ): Promise<Appointment[]>;
  findByDayFromProvider(data: IFindInDayForProviderDTO): Promise<Appointment[]>;
}
