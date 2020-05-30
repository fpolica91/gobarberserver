import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', appointmentsController.create);

// appointmentRouter.get('/', async (req, res) => {
//   /** you use the function @getCustomRepository
//    * once  @appointmentService is set you have access to typeORM functions
//    * @typeORM functions find, create, save
//    */>

//   const appointmentService = getCustomRepository(AppointmentRepository);
//   const appointments = await appointmentService.find();
//   return res.json(appointments);
// });

export default appointmentRouter;
