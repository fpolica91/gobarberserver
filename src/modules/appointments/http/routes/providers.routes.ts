import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersControllers';
import ProviderMonthlyAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDailyAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthlyAvailabilityController = new ProviderMonthlyAvailabilityController();
const providerDailyAvailabilityController = new ProviderDailyAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:id/month-availability',
  providerMonthlyAvailabilityController.index
);
providersRouter.get(
  '/:id/day-availability',
  providerDailyAvailabilityController.index
);

export default providersRouter;
