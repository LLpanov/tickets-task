import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/index.js'

const handleNotFoundError = () => new AppError('Not found this event', 404)

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') {
      err = handleNotFoundError();
    }

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};







