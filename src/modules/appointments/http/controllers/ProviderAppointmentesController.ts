import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersAppointmentService from '../../services/ListProviderAppointmentService';

export default class ListProvidersAppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProvidersAppointmentService = container.resolve(
      ListProvidersAppointmentService
    );
    const { day, month, year } = request.body;
    const appointments = await listProvidersAppointmentService.execute({
      user_id: request.user.id,
      day,
      month,
      year
    });
    return response.json(appointments);
  }
}
