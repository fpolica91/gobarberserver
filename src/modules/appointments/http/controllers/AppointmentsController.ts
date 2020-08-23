import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '../../services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    /**
     * @createAppointmentService already has access to database,
     * @getCustomRepository not needed in this route
     */
    const createAppointmentService = container.resolve(
      CreateAppointmentService
    );
    const appointment = await createAppointmentService.execute({
      date: parseISO(date),
      provider_id: provider_id,
      user_id: request.user.id
      // date,
      // provider_id,
      // user_id: request.user.id
    });
    return response.json(appointment);
  }
}
