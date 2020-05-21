import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';
const userRouter = Router();
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import AvatarController from '../controllers/AvatarController';
import UsersController from '../controllers/UsersController';
/**
 *
 */

const upload = multer(uploadConfig);
const userController = new UsersController();

userRouter.post('/', userController.create);

const avatarController = new AvatarController();

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  avatarController.update
);

export default userRouter;
