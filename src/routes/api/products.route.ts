import express from 'express';
import * as productsController from '../../controllers/products.controller';

const products = express.Router();

products
  .route('/products')
  .get(productsController.getAllProducts)
  .post(productsController.createProduct)
  .patch(productsController.updateProduct);

products
  .route('/products/:id')
  .get(productsController.getProduct)
  .delete(productsController.deleteProduct);

export default products;
