import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as envConfig from '../config';
import IError from '../interfaces/error.interface';

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get('Authorization')?.split(' ')[1] || null;
    // console.log(token);
    if (!token) return;
    jwt.verify(token, envConfig.TOKEN_SERCRET as string);
    // console.log(validToken);
    next();
  } catch (error) {
    console.log(error);
    (error as IError).status = 401;
    next(error);
  }
};

export default checkToken;
