import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter, endOfDay } from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

interface IRequest {
  user_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ) { }
  public async execute({ user_id, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findByMonthFromProvider(
      {
        user_id: user_id,
        month: month,
        year: year
      }
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayInMonth = Array.from(
      { length: numberOfDaysInMonth },
      (value, index) => index + 1
    );

    const availability = eachDayInMonth.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59)

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      return {
        day,
        available: isAfter(compareDate, new Date()) && appointmentsInDay.length < 10
      };
    });

    return availability;
  }
}
