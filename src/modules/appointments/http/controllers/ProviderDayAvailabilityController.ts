import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailability from '../../services/ListProviderDayAvailability';

export default class ProviderDailyAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.query;
    const listProviderDailyAvailability = container.resolve(
      ListProviderDayAvailability
    );
    const availabilty = await listProviderDailyAvailability.execute({
      user_id: request.params.id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });

    return response.json(availabilty);
  }
}
