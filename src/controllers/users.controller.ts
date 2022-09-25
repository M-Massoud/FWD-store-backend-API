import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/users.model';

const userModel = new UserModel();

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await userModel.getAllUsers();
    res.status(200).json({ users: allUsers });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getUser(parseInt(req.params.id));
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.createUser(req.body);
    res.status(200).json({ message: 'user created successfully', user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateUser(req.body);
    res.status(200).json({ message: 'user updated successfully', user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userModel.deleteUser(parseInt(req.params.id));
    res.status(200).json({ message: 'deleted user successfully' });
  } catch (error) {
    next(error);
  }
};
