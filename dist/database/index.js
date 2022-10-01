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
Object.defineProperty(exports, "__esModule", { value: true });
var envConfig = __importStar(require("../config"));
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    user: envConfig.PGUSER,
    host: envConfig.PGHOST,
    database: envConfig.ENV === 'dev'
        ? envConfig.PGDATABASE_DEV
        : envConfig.PGDATABASE_TEST,
    password: envConfig.PGPASSWORD,
    port: Number(envConfig.PGPORT),
});
pool.on('error', function (err) {
    console.log(err.message);
});
exports.default = pool;
