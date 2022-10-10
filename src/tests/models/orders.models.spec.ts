import supertest from 'supertest';
import app from '../../index';
import UserModel from '../../models/users.model';
import ProudtModel from '../../models/products.model';
import OrdersModel from '../../models/orders.model';
import database from '../../database';
import { Status } from '../../interfaces/orders.interface';

// create a request object
const request = supertest(app);

const userModel = new UserModel();
const productModel = new ProudtModel();
const ordersModel = new OrdersModel();

describe('all orders model methods should be defined', () => {
  beforeAll(async () => {
    await userModel.createUser({
      firstname: 'first',
      lastname: 'last',
      email: 'example@example.com',
      password: '12345',
    });

    await productModel.createProduct({ name: 'product 1', price: 99 });
  });

  afterAll(async () => {
    await ordersModel.deleteOrder(1);
    await userModel.deleteUser(1);
    await productModel.deleteProduct(1);

    const connection = await database.connect();
    const sql =
      'ALTER SEQUENCE users_id_seq RESTART WITH 1; \nALTER SEQUENCE products_id_seq RESTART WITH 1';
    await connection.query(sql);
  });

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

  it('add product to odrer method should be defined ', () => {
    expect(ordersModel.addProductToOrder).toBeDefined();
  });

  it('delete product from order method should be defined ', () => {
    expect(ordersModel.removeProductFromOrder).toBeDefined();
  });

  it('test create new order', async () => {
    const response = await ordersModel.createOrder({
      user_id: 1,
      total_price: 190,
    });
    expect(response.user_id).toBe(1);
    expect(response.total_price).toBe(190);
  });

  it('testing orders model get all orders method', async () => {
    const response = await ordersModel.getAllOrders();
    expect(response.length).toBeGreaterThan(0);
  });

  it('testing orders model get one order method', async () => {
    const response = await ordersModel.getOrder(1);
    expect(response.id).toBe(1);
    expect(response.user_id).toBe(1);
    expect(response.total_price).toBe(190);
  });

  it('test orders model update order method', async () => {
    const response = await ordersModel.updateOrder({
      id: 1,
      user_id: 1,
      total_price: 200,
    });
    expect(response.user_id).toBe(1);
    expect(response.total_price).toBe(200);
  });

  it('testing orders model delete order method', async () => {
    expect(async () => {
      await productModel.deleteProduct(1);
    }).not.toThrow();
  });
});
