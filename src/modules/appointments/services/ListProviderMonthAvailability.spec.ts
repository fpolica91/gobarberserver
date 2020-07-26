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
      user_id: '112233',
      date: new Date(2020, 7, 20, 9, 0, 0)
    });

    await fakeAppointmentRepository.create({
      user_id: '112233',
      provider_id: 'random_id',
      date: new Date(2020, 7, 20, 10, 0, 0)
    });
    await fakeAppointmentRepository.create({
      user_id: '112233',
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
        { available: true, day: 1 },
        { available: true, day: 2 },
        { available: true, day: 3 },
        { available: true, day: 4 },
        { available: true, day: 5 },
        { available: true, day: 6 },
        { available: true, day: 7 },
        { available: true, day: 8 },
        { available: true, day: 9 },
        { available: true, day: 10 },
        { available: true, day: 11 },
        { available: true, day: 12 },
        { available: true, day: 13 },
        { available: true, day: 14 },
        { available: true, day: 15 },
        { available: true, day: 16 },
        { available: true, day: 17 },
        { available: true, day: 18 },
        { available: true, day: 19 },
        { available: true, day: 20 },
        { available: true, day: 21 },
        { available: true, day: 22 },
        { available: true, day: 23 },
        { available: true, day: 24 },
        { available: true, day: 25 },
        { available: true, day: 26 },
        { available: true, day: 27 },
        { available: true, day: 28 },
        { available: true, day: 29 },
        { available: true, day: 30 },
        { available: true, day: 31 }
      ])
    );
  });
});
