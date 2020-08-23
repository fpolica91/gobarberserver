import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate'

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ListProvidersAppointmentController from '../controllers/ProviderAppointmentesController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
const listProvidersAppointmentController = new ListProvidersAppointmentController();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', appointmentsController.create);
//appointments for logged provider
appointmentRouter.get('/me', listProvidersAppointmentController.index);

export default appointmentRouter;
