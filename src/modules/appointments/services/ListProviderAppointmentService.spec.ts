import FakeAppointmentRepository from '../repositories/fakes/fakeAppointmentRepository';
import ListProvidersAppointmentService from './ListProviderAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProvidersAppointmentService: ListProvidersAppointmentService;

describe('ListProvidersAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProvidersAppointmentService = new ListProvidersAppointmentService(
      fakeAppointmentRepository
    );
  });

  it('should be able to list providers appointments for a specific day', async () => {
    const appointmentOne = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    const appointmentTwo = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    });

    const appointments = await listProvidersAppointmentService.execute({
      user_id: 'provider',
      year: 2020,
      month: 5,
      day: 20
    });

    expect(appointments).toEqual([appointmentOne, appointmentTwo]);
  });
});
