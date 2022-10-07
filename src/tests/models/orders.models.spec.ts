import OrdersModel from '../../models/orders.model';

const ordersModel = new OrdersModel();

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
