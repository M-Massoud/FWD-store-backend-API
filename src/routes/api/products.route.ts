import express from 'express';
import * as productsController from '../../controllers/products.controller';
import checkToken from '../../middlewares/checkToken.middleware';

const products = express.Router();

products
  .route('/products')
  .get(productsController.getAllProducts)
  .post(checkToken, productsController.createProduct)
  .patch(productsController.updateProduct);

products
  .route('/products/:id')
  .get(productsController.getProduct)
  .delete(checkToken, productsController.deleteProduct);

export default products;
