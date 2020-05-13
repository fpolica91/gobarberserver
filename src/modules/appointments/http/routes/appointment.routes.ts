import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
/**
 *  @module imports
 * @relative imports
 */
import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();

/**
 * @ensureAuthenticated requires the jwt on every route of @appointmentRouter
 */
appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;
  const parsedDate = parseISO(date);
  /**
   * @createAppointmentService already has access to database,
   * @getCustomRepository not needed in this route
   */
  const createAppointmentService = new CreateAppointmentService();
  const appointment = await createAppointmentService.execute({
    date: parsedDate,
    provider_id
  });
  return res.json(appointment);
});

appointmentRouter.get('/', async (req, res) => {
  /** you use the function @getCustomRepository
   * once  @appointmentService is set you have access to typeORM functions
   * @typeORM functions find, create, save
   */

  const appointmentService = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentService.find();
  return res.json(appointments);
});

export default appointmentRouter;
