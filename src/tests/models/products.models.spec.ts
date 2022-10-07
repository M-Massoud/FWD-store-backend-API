import ProudtModel from '../../models/products.model';

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
