import 'reflect-metadata';
import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import rateLimiter from './middlewares/rateLimiter'

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter)
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);
// app.use(errors())
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    /**
     * errors from @AppError are known errors
     */
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      });
    }
    console.error(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
);

app.listen(5000, () => console.log('server started on port 5000'));
