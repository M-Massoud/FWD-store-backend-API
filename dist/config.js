"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_SERCRET = exports.SALT_ROUNDS = exports.PGPORT = exports.PGPASSWORD = exports.PGDATABASE_TEST = exports.PGDATABASE_DEV = exports.PGUSER = exports.PGHOST = exports.ENV = exports.PORT = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = (_a = process.env, _a.PORT), exports.ENV = _a.ENV, exports.PGHOST = _a.PGHOST, exports.PGUSER = _a.PGUSER, exports.PGDATABASE_DEV = _a.PGDATABASE_DEV, exports.PGDATABASE_TEST = _a.PGDATABASE_TEST, exports.PGPASSWORD = _a.PGPASSWORD, exports.PGPORT = _a.PGPORT, exports.SALT_ROUNDS = _a.SALT_ROUNDS, exports.TOKEN_SERCRET = _a.TOKEN_SERCRET;
