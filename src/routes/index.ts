import express, { Request, Response } from 'express';

// import routes
import users from './api/users.route';
import products from './api/products.route';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('welcome to the home page!');
});

routes.use(users);
routes.use(products);

export default routes;
