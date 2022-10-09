"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var orders_model_1 = __importDefault(require("../../models/orders.model"));
var ordersModel = new orders_model_1.default();
describe('all orders model methods should be defined', function () {
    it('create product method should be defined ', function () {
        expect(ordersModel.createOrder).toBeDefined();
    });
    it('get all products method should be defined ', function () {
        expect(ordersModel.getAllOrders).toBeDefined();
    });
    it('get one product method should be defined ', function () {
        expect(ordersModel.getOrder).toBeDefined();
    });
    it('update one product method should be defined ', function () {
        expect(ordersModel.updateOrder).toBeDefined();
    });
    it('delete one product method should be defined ', function () {
        expect(ordersModel.deleteOrder).toBeDefined();
    });
    it('add product to odrer method should be defined ', function () {
        expect(ordersModel.addProductToOrder).toBeDefined();
    });
    it('delete product from order method should be defined ', function () {
        expect(ordersModel.removeProductFromOrder).toBeDefined();
    });
});
