import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowProviderService from '../../services/ShowProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;
    const showProviderService = container.resolve(ShowProviderService);
    const providers = await showProviderService.execute(user_id);
    return response.json(providers);
  }
}
