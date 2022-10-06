import supertest from 'supertest';
import app from '../../index';
import database from '../../database';
import OrdersModel from '../../models/orders.model';
import UserModel from '../../models/users.model';
import ProudtModel from '../../models/products.model';

const request = supertest(app);

const ordersModel = new OrdersModel();
const userModel = new UserModel();
const productModel = new ProudtModel();

describe('all orders model methods should be defined', () => {
  it('create product method should be defined ', () => {
    expect(ordersModel.createOrder).toBeDefined();
  });

  it('get all products method should be defined ', () => {
    expect(ordersModel.getAllOrders).toBeDefined();
  });

  it('get one product method should be defined ', () => {
    expect(ordersModel.getOrder).toBeDefined();
  });

  it('update one product method should be defined ', () => {
    expect(ordersModel.updateOrder).toBeDefined();
  });

  it('delete one product method should be defined ', () => {
    expect(ordersModel.deleteOrder).toBeDefined();
  });
});

describe('test orders methods', () => {
  beforeAll(async () => {
    await userModel.createUser({
      firstname: 'first',
      lastname: 'last',
      email: 'test1@example.com',
      password: '12345',
    });

    await productModel.createProduct({ name: 'product 1', price: 99 });
  });

  afterAll(async () => {
    await request.delete('/users/1');
    const connection = await database.connect();
    const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);
  });

  it('test create new order', async () => {
    const response = await request
      .post('/orders')
      .send({
        user_id: 1,
        product_id: 1,
        status: 'active',
        total_price: 99,
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
  });

  it('test get all orders', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.orders)).toBe(true);
  });

  it('test get one order', async () => {
    const response = await request.get('/orders/1');
    // console.log(response);
    expect(response.status).toBe(200);
    expect(response.body.order).toEqual({
      id: 1,
      user_id: 1,
      product_id: 1,
      status: 'active',
      total_price: 99,
    });
  });

  it('test update one order', async () => {
    const response = await request
      .patch('/orders')
      .send({
        user_id: 1,
        product_id: 1,
        status: 'active',
        total_price: 199,
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
  });

  it('test delete one user', async () => {
    const response = await request.delete('/orders/1');
    expect(response.status).toBe(200);
  });
});
