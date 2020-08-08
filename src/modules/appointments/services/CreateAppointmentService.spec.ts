import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/fakeAppointmentRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    );
    const appointment = await createAppointmentService.execute({
      date: new Date(),
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
    ).rejects.toBeInstanceOf(Error);
  });
});
