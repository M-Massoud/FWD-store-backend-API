import app from '../../index';
import supertest from 'supertest';
import ProudtModel from '../../models/products.model';
import UserModel from '../../models/users.model';
import database from '../../database';

const request = supertest(app);
const userModel = new UserModel();
const productModel = new ProudtModel();
let token = '';

describe('all product model methods should be defined', () => {
  beforeAll(async () => {
    const connection = await database.connect();
    const sql =
      'DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1';
    await connection.query(sql);

    await userModel.createUser({
      firstname: 'first',
      lastname: 'last',
      email: 'test1@example.com',
      password: '12345',
    });

    await productModel.createProduct({ name: 'product 1', price: 99 });

    const response = await request
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test1@example.com',
        password: '12345',
      });

    // console.log(response.body.token);
    token = response.body.token;
  });

  afterAll(async () => {
    await request.delete('/users/1').set('Authorization', `Bearer ${token}`);
    const connection = await database.connect();
    const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);
  });

  it('create product method should be defined ', () => {
    expect(productModel.createProduct).toBeDefined();
  });

  it('get all products method should be defined ', () => {
    expect(productModel.getAllProducts).toBeDefined();
  });

  it('get one product method should be defined ', () => {
    expect(productModel.getProduct).toBeDefined();
  });

  it('update one product method should be defined ', () => {
    expect(productModel.updateProduct).toBeDefined();
  });

  it('delete one product method should be defined ', () => {
    expect(productModel.deleteProduct).toBeDefined();
  });

  it('testing product model get all products method', async () => {
    const response = await productModel.getAllProducts();
    expect(response.length).toBeGreaterThan(0);
  });

  it('testing product model get one product method', async () => {
    const response = await productModel.getProduct(1);
    expect(response.name).toBe('product 1');
    expect(response.price).toBe(99);
  });

  it('testing product model create product method', async () => {
    const response = await productModel.createProduct({
      name: 'test product 2',
      price: 99,
    });
    expect(response.id).toBe(2);
    expect(response.name).toBe('test product 2');
    expect(response.price).toBe(99);
  });

  it('testing product model update product method', async () => {
    const response = await productModel.updateProduct({
      id: 2,
      name: 'test product 2 updated',
      price: 99,
    });
    expect(response.name).toBe('test product 2 updated');
    expect(response.price).toBe(99);
  });

  it('testing product model delete product method', async () => {
    expect(async () => {
      await productModel.deleteProduct(2);
    }).not.toThrow();
  });
});
