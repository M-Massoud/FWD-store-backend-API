import { Request, Response, NextFunction } from 'express';
import ProudtModel from '../models/products.model';

const proudctModel = new ProudtModel();

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProducts = await proudctModel.getAllProducts();
    res.status(200).json({ products: allProducts });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await proudctModel.getProduct(parseInt(req.params.id));
    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await proudctModel.createProduct(req.body);
    res.status(200).json({ message: 'product created successfully', product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await proudctModel.updateProduct(req.body);
    res.status(201).json({ message: 'user updated successfully', product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await proudctModel.deleteProduct(parseInt(req.params.id));
    res.status(200).json({ message: 'product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
