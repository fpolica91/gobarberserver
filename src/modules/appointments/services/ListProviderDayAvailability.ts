import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

interface IRequest {
  user_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailability {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ) {}
  public async execute({
    user_id,
    month,
    year,
    day
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findByDayFromProvider(
      {
        user_id,
        year,
        month,
        day
      }
    );

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointment = appointments.find(
        appointment => getHours(appointment.date) === hour
      );
      // get the current date
      const currentDate = new Date(Date.now());
      // compare date is the a new date based on the received parameters
      const compareDate = new Date(year, month - 1, hour);

      return {
        hour,
        // if an appointment is not booked and the date is after current date it is avaiable
        available: !hasAppointment && isAfter(compareDate, currentDate)
      };
    });

    return availability;
  }
}
