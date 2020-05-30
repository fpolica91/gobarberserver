import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '../../services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);
    /**
     * @createAppointmentService already has access to database,
     * @getCustomRepository not needed in this route
     */
    const createAppointmentService = container.resolve(
      CreateAppointmentService
    );
    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider_id
    });
    return response.json(appointment);
  }
}
