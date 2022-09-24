import { Request, Response, NextFunction } from 'express';
import IError from '../interfaces/errorInterfade';

// error handling middleware
const errorMiddleware = (
  err: IError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errorMsg = err.message || 'Something broke!';
  const errorStatus = err.status || 500;
  res.status(errorStatus).json({ errorMsg });
};

export default errorMiddleware;
