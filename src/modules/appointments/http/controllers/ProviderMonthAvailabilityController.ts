import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '../../services/ListProviderMonthAvailability';

export default class ProviderMonthlyAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;
    const listProvidersMontlyAvailability = container.resolve(
      ListProviderMonthAvailabilityService
    );
    const availabilty = await listProvidersMontlyAvailability.execute({
      user_id: request.params.id,
      month: Number(month),
      year: Number(year)
    });

    return response.json(availabilty);
  }
}
