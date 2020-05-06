import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JTW Token is missing', 401);
  }

  const { secret } = authConfig.jtw;

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as TokenPayload;

    /**
     * in @javascript we would use req.user = decode.id
     */

    request.user = {
      id: sub
    };
    return next();
  } catch (error) {
    throw new AppError('Invalid Token token', 401);
  }
}
