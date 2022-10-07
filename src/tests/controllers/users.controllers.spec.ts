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
      email: 'test1@example.com',
      password: '12345',
    });

    const response = await request
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test1@example.com',
        password: '12345',
      })
      .set('Authorization', `Bearer ${token}`);
    token = response.body.token;
  });

  afterAll(async () => {
    await request.delete('/users/1').set('Authorization', `Bearer ${token}`);
    const connection = await database.connect();
    const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);
  });

  it('test create new user', async () => {
    const response = await request
      .post('/users')
      .set('Accept', 'application/json')
      .send({
        firstname: 'first',
        lastname: 'last',
        email: 'test2@example.com',
        password: '12345',
      });

    expect(response.status).toBe(200);
  });

  it('test authenticate user', async () => {
    const response = await request
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test1@example.com',
        password: '12345',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('test get all users', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.users)).toBe(true);
  });

  it('test get one user', async () => {
    const response = await request
      .get('/users/2')
      .set('Authorization', `Bearer ${token}`);

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
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

  it('test delete one user', async () => {
    const response = await request
      .delete('/users/2')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
