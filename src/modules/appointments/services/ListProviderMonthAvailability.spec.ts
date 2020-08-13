import ListProviderMonthAvailabilityService from './ListProviderMonthAvailability';
import FakeAppointmentRepository from '../repositories/fakes/fakeAppointmentRepository';
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;
describe('ShowProfile', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository
    );
  });
  it('should be able to list the monthly availability for the provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'random_id',
      date: new Date(2020, 7, 20, 9, 0, 0)
    });

    await fakeAppointmentRepository.create({
      provider_id: 'random_id',
      date: new Date(2020, 7, 20, 10, 0, 0)
    });

    await fakeAppointmentRepository.create({
      provider_id: 'random_id',
      date: new Date(2020, 7, 23, 10, 0, 0)
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      user_id: 'random_id',
      year: 2020,
      month: 7
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 23, available: false },
        { day: 25, available: true }
      ])
    );
  });
});
