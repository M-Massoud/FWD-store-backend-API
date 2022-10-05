import express from 'express';
import * as ordersController from '../../controllers/orders.controller';

const products = express.Router();

products
  .route('/orders')
  .get(ordersController.getAllOrders)
  .post(ordersController.createOrder)
  .patch(ordersController.updateOrder);

products
  .route('/orders/:id')
  .get(ordersController.getOrder)
  .delete(ordersController.deleteOrder);

export default products;
