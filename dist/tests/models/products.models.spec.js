"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var products_model_1 = __importDefault(require("../../models/products.model"));
var productModel = new products_model_1.default();
describe('all product model methods should be defined', function () {
    it('create product method should be defined ', function () {
        expect(productModel.createProduct).toBeDefined();
    });
    it('get all products method should be defined ', function () {
        expect(productModel.getAllProducts).toBeDefined();
    });
    it('get one product method should be defined ', function () {
        expect(productModel.getProduct).toBeDefined();
    });
    it('update one product method should be defined ', function () {
        expect(productModel.updateProduct).toBeDefined();
    });
    it('delete one product method should be defined ', function () {
        expect(productModel.deleteProduct).toBeDefined();
    });
});
