"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// error handling middleware
var errorMiddleware = function (err, req, res, _next) {
    var errorMsg = err.message || 'Something broke!';
    var errorStatus = err.status || 500;
    res.status(errorStatus).json({ errorMsg: errorMsg });
};
exports.default = errorMiddleware;
