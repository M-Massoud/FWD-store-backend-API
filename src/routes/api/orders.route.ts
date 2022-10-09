import express from 'express';
import * as ordersController from '../../controllers/orders.controller';
import checkToken from '../../middlewares/checkToken.middleware';

const orders = express.Router();

orders
  .route('/orders')
  .get(checkToken, ordersController.getAllOrders)
  .post(checkToken, ordersController.createOrder)
  .patch(checkToken, ordersController.updateOrder);

orders
  .route('/orders/:id/addProduct')
  .post(checkToken, ordersController.addProductToOrder);

orders
  .route('/orders/:id/removeProduct')
  .delete(checkToken, ordersController.removeProductFromOrder);

orders
  .route('/orders/:id')
  .get(checkToken, ordersController.getOrder)
  .delete(checkToken, ordersController.deleteOrder);

export default orders;
