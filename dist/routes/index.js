"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import routes
var users_route_1 = __importDefault(require("./api/users.route"));
var products_route_1 = __importDefault(require("./api/products.route"));
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    res.send('welcome to the home page!');
});
routes.use(users_route_1.default);
routes.use(products_route_1.default);
exports.default = routes;
