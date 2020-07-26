import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/fakeAppointmentRepository';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 1, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '123123',
      user_id: '1122'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments at the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    );
    const appointmentDate = new Date(2020, 4, 10, 11);
    const appointment = await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123123',
      user_id: '112233'
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123123',
        user_id: '112233'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    );
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());
    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 10),
        user_id: '112233',
        provider_id: '112244'
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to schedule an appointment with provider being user', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 10),
        user_id: '112233',
        provider_id: '112233'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to schedule an appointment outside operating hours', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 7),
        user_id: '112233',
        provider_id: '112233'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
