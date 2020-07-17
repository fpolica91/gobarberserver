import { Router } from 'express';

import appointmentRouter from '@modules/appointments/http/routes/appointment.routes';
import userRouter from '@modules/users/http/routes/user.routes';
import sessionRouter from '@modules/users/http/routes/session.routes';
import passwordRouter from '@modules/users/http/routes/password.routes';
import profileRoutes from '../../../../modules/users/http/routes/profile.routes';

const routes = Router();
routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRoutes);

export default routes;
