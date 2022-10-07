import express from 'express';
import * as usersController from '../../controllers/users.controller';
import checkToken from '../../middlewares/checkToken.middleware';

const users = express.Router();

users
  .route('/users')
  .get(checkToken, usersController.getAllUsers)
  .post(usersController.createUser)
  .patch(checkToken, usersController.updateUser);

users
  .route('/users/:id')
  .get(checkToken, usersController.getUser)
  .delete(checkToken, usersController.deleteUser);

users.route('/login').post(usersController.authenticateUser);

export default users;
