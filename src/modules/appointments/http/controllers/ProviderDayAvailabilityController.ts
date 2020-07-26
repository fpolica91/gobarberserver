import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailability from '../../services/ListProviderDayAvailability';

export default class ProviderDailyAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.body;
    const listProviderDailyAvailability = container.resolve(
      ListProviderDayAvailability
    );
    const availabilty = await listProviderDailyAvailability.execute({
      user_id: request.params.id,
      day,
      month,
      year
    });

    return response.json(availabilty);
  }
}
