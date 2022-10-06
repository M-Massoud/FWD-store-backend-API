import supertest from 'supertest';
import app from '../../index';
import UserModel from '../../models/users.model';

// create a request object
const request = supertest(app);

const userModel = new UserModel();

// create a user to test on
describe('test user methods', () => {
  beforeAll(async () => {
    await userModel.createUser({
      firstname: 'first',
      lastname: 'last',
      email: 'test1@example.com',
      password: '12345',
    });
  });

  it('test create new user', async () => {
    const response = await request
      .post('/users')
      .send({
        firstname: 'first',
        lastname: 'last',
        email: 'test2@example.com',
        password: '12345',
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
  });

  it('test authenticate user', async () => {
    const response = await request
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test1@example.com',
        password: '12345',
      });
    expect(response.status).toBe(200);
  });

  it('test get all users', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.users)).toBe(true);
  });

  it('test get one user', async () => {
    const response = await request.get('/users/2');
    // console.log(response);
    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: 2,
      firstname: 'first',
      lastname: 'last',
      email: 'test2@example.com',
    });
  });

  it('test update one user', async () => {
    const response = await request
      .patch('/users')
      .send({
        id: 2,
        firstname: 'first',
        lastname: 'lastupdated',
        email: 'test2@example.com',
        password: '12345',
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
  });

  it('test delete one user', async () => {
    const response = await request.delete('/users/2');
    expect(response.status).toBe(200);
  });
});

describe('Test users endpoint response', () => {
  it('test users endpoint', async () => {
    const response = await request.get('/users');
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
