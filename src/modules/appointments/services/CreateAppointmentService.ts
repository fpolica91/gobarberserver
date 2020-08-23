import 'reflect-metadata';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  provider_id: string;
  date: Date;
  user_id: string;
}


@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
    @inject('AppointmentRepository')
    private notificationsRepository: INotificationsRepository
  ) { }
  public async execute({
    date,
    provider_id,
    user_id
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('you cannot schedule an appointment on a past date');
    }

    if (user_id === provider_id) {
      throw new AppError('You cannot create an appointment with yourself');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only book appointments during operating hours'
      );
    }



    const booked = await this.appointmentRepository.findByDate(appointmentDate, provider_id);
    if (booked) {
      throw new AppError('this appointment is already booked');
    }

    if (!appointmentDate) {
      throw new Error('appointment date is required')
    }
    const appointment = this.appointmentRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });


    const formattedDate = format(appointmentDate, "dd/MM/yyyy 'at' HH:mm")

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `New Appointment on ${formattedDate}`
    })



    return appointment;
  }
}

export default CreateAppointmentService;
