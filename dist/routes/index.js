"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import routes
var users_route_1 = __importDefault(require("./api/users.route"));
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    res.send('this is the home page from the routes folder');
});
routes.use(users_route_1.default);
exports.default = routes;
