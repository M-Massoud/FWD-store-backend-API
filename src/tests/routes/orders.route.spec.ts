import supertest from 'supertest';
import app from '../../index';
import database from '../../database';
import UserModel from '../../models/users.model';

const request = supertest(app);

const userModel = new UserModel();
let token = '';

describe('test orders methods', () => {
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

    await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'product 1',
        price: 99,
      })
      .set('Accept', 'application/json');
  });

  afterAll(async () => {
    await request.delete('/users/1').set('Authorization', `Bearer ${token}`);

    const connection = await database.connect();
    const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);
  });

  it('test get all orders', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('test get one order', async () => {
    const response = await request
      .get('/orders/1')
      .set('Authorization', `Bearer ${token}`);
    // console.log(response);
    expect(response.status).toBe(200);
  });

  it('test update one order', async () => {
    const response = await request
      .patch('/orders')
      .send({
        user_id: 1,
        status: 'active',
        total_price: 199,
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
  });

  it('test delete one order', async () => {
    const response = await request
      .delete('/orders/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
