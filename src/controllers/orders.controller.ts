import { Request, Response, NextFunction } from 'express';
import OrdersModel from '../models/orders.model';

const ordersModel = new OrdersModel();

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allOrders = await ordersModel.getAllOrders();
    res.status(200).json({ orders: allOrders });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await ordersModel.getOrder(parseInt(req.params.id));
    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await ordersModel.createOrder(req.body);
    res.status(200).json({ message: 'order created successfully', order });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await ordersModel.updateOrder(req.body);
    res.status(201).json({ message: 'order updated successfully', order });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ordersModel.deleteOrder(parseInt(req.params.id));
    res.status(200).json({ message: 'order deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const addProductToOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ordersModel.addProductToOrder(
      req.body.product_id,
      parseInt(req.params.id),
      req.body.quantity
    );
    res
      .status(200)
      .json({ message: 'product added successfully to the order' });
  } catch (error) {
    next(error);
  }
};

export const removeProductFromOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ordersModel.removeProductFromOrder(
      Number(req.body.product_id),
      Number(req.params.id)
    );
    res
      .status(200)
      .json({ message: 'product deleted successfully from the order' });
  } catch (error) {
    next(error);
  }
};
