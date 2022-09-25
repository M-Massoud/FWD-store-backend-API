import express from 'express';
import * as usersController from '../../controllers/users.controller';
const users = express.Router();

users
  .route('/users')
  .get(usersController.getAllUsers)
  .post(usersController.createUser)
  .patch(usersController.updateUser);

users
  .route('/users/:id')
  .get(usersController.getUser)
  .delete(usersController.deleteUser);

export default users;
