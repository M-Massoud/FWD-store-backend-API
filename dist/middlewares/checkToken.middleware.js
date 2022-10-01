"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var envConfig = __importStar(require("../config"));
var checkToken = function (req, res, next) {
    var _a;
    try {
        var token = ((_a = req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || null;
        // console.log(token);
        if (!token)
            return;
        jsonwebtoken_1.default.verify(token, envConfig.TOKEN_SERCRET);
        // console.log(validToken);
        next();
    }
    catch (error) {
        console.log(error);
        error.status = 401;
        next(error);
    }
};
exports.default = checkToken;
