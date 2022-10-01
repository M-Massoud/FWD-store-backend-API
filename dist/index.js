"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var routes_1 = __importDefault(require("./routes"));
var error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3002;
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use(routes_1.default);
// use the error middleware
app.use(error_middleware_1.default);
// start express server
app.listen(port, function () {
    console.log("server currently listening on port ".concat(port));
});
exports.default = app;
