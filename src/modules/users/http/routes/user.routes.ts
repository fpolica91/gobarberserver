import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';
const userRouter = Router();
import UserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import uploadConfig from '@config/upload';
/**
 *
 */

const upload = multer(uploadConfig);

userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const createUser = container.resolve(UserService);
  const user = await createUser.execute({
    name,
    email,
    password
  });
  delete user.password;
  return res.json(user);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename
    });
    delete user.password;
    return res.json(user);
  }
);

export default userRouter;
