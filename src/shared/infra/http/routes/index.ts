import { Router } from 'express';

import appointmentRouter from '@modules/appointments/http/routes/appointment.routes';
import userRouter from '@modules/users/http/routes/user.routes';
import sessionRouter from '@modules/users/http/routes/session.routes';

const routes = Router();
routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
