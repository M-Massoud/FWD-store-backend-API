import supertest from 'supertest';
import app from '../../index';
import ProudtModel from '../../models/products.model';

const request = supertest(app);

const productModel = new ProudtModel();

describe('all product model methods should be defined', () => {
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
});

describe('test product methods', () => {
  it('test create new product', async () => {
    const response = await request
      .post('/products')
      .send({
        name: 'product 1',
        price: 99,
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
  });

  it('test get all products', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.products)).toBe(true);
  });

  it('test get one product', async () => {
    const response = await request.get('/products/1');
    // console.log(response);
    expect(response.status).toBe(200);
    expect(response.body.product).toEqual({
      id: 1,
      name: 'product 1',
      price: 99,
    });
  });

  it('test update one product', async () => {
    const response = await request
      .patch('/products')
      .send({
        id: 1,
        name: 'product 1 updated',
        price: 199,
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
  });

  it('test delete one product', async () => {
    const response = await request.delete('/products/1');
    expect(response.status).toBe(200);
  });
});
