import express from 'express';
import * as usersController from '../../controllers/users.controller';
import checkToken from '../../middlewares/checkToken.middleware';

const users = express.Router();

users
  .route('/users')
  .get(usersController.getAllUsers)
  .post(usersController.createUser)
  .patch(usersController.updateUser);

users
  .route('/users/:id')
  .get(checkToken, usersController.getUser)
  .delete(usersController.deleteUser);

users.route('/login').post(usersController.authenticateUser);
export default users;
