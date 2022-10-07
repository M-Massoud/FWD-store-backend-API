import supertest from 'supertest';
import app from '../../index';
import UserModel from '../../models/users.model';
import database from '../../database';

// create a request object
const request = supertest(app);

const userModel = new UserModel();
let token = '';

// create a user to test on
describe('test user methods', () => {
  beforeAll(async () => {
    await userModel.createUser({
      firstname: 'first',
      lastname: 'last',
      email: 'test@example.com',
      password: '12345',
    });

    const response = await request
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test@example.com',
        password: '12345',
      });
    token = response.body.token;
  });

  afterAll(async () => {
    await request.delete('/users/1').set('Authorization', `Bearer ${token}`);

    const connection = await database.connect();
    const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);
  });

  describe('Test users endpoint response', () => {
    it('test users endpoint', async () => {
      const response = await request
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  describe('test user model have all methods', () => {
    it('user model should have the create user method', () => {
      expect(userModel.createUser).toBeDefined();
    });

    it('user model should have the get user method', () => {
      expect(userModel.getUser).toBeDefined();
    });

    it('user model should have the get all user method', () => {
      expect(userModel.getAllUsers).toBeDefined();
    });

    it('user model should have the delete user method', () => {
      expect(userModel.deleteUser).toBeDefined();
    });

    it('user model should have the update user method', () => {
      expect(userModel.updateUser).toBeDefined();
    });

    it('user model should have the authenticate user method', () => {
      expect(userModel.authenticateUser).toBeDefined();
    });
  });
});
