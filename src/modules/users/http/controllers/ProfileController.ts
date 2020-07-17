import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '../../services/UpdateProfileService';

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;
    const updateProfile = container.resolve(UpdateProfileService);
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password
    });
    delete user.password;
    return response.json(user);
  }
}
