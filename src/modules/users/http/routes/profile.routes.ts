import { Router } from 'express';
const profileRoutes = Router();
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

profileRoutes.use(ensureAuthenticated);

/**
 *
 */

const profileController = new ProfileController();

profileRoutes.put('/update', profileController.update);

export default profileRoutes;
