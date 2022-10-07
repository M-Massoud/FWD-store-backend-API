import express from 'express';
import * as ordersController from '../../controllers/orders.controller';
import checkToken from '../../middlewares/checkToken.middleware';

const products = express.Router();

products
  .route('/orders')
  .get(checkToken, ordersController.getAllOrders)
  .post(checkToken, ordersController.createOrder)
  .patch(checkToken, ordersController.updateOrder);

products
  .route('/orders/:id')
  .get(checkToken, ordersController.getOrder)
  .delete(checkToken, ordersController.deleteOrder);

export default products;
