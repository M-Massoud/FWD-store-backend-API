import express, { Request, Response } from 'express';

// import routes
import users from './api/usersRoute';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('this is the home page from the routes folder');
});

routes.use(users);

export default routes;
