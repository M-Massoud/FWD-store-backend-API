"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var users_model_1 = __importDefault(require("../../models/users.model"));
var database_1 = __importDefault(require("../../database"));
// create a request object
var request = (0, supertest_1.default)(index_1.default);
var userModel = new users_model_1.default();
var token = '';
// create a user to test on
describe('test user methods', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.createUser({
                        firstname: 'first',
                        lastname: 'last',
                        email: 'test@example.com',
                        password: '12345',
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, request
                            .post('/login')
                            .set('Accept', 'application/json')
                            .send({
                            email: 'test@example.com',
                            password: '12345',
                        })];
                case 2:
                    response = _a.sent();
                    token = response.body.token;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete('/users/1').set('Authorization', "Bearer ".concat(token))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, request.delete('/users/2').set('Authorization', "Bearer ".concat(token))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, database_1.default.connect()];
                case 3:
                    connection = _a.sent();
                    sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
                    return [4 /*yield*/, connection.query(sql)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Test users endpoint response', function () {
        it('test users endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/users')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('test user model have all methods', function () {
        it('user model should have the create user method', function () {
            expect(userModel.createUser).toBeDefined();
        });
        it('user model should have the get user method', function () {
            expect(userModel.getUser).toBeDefined();
        });
        it('user model should have the get all user method', function () {
            expect(userModel.getAllUsers).toBeDefined();
        });
        it('user model should have the delete user method', function () {
            expect(userModel.deleteUser).toBeDefined();
        });
        it('user model should have the update user method', function () {
            expect(userModel.updateUser).toBeDefined();
        });
        it('user model should have the authenticate user method', function () {
            expect(userModel.authenticateUser).toBeDefined();
        });
    });
    it('testing user model get all users method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.getAllUsers()];
                case 1:
                    response = _a.sent();
                    expect(response.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing user model get one user method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.getUser(1)];
                case 1:
                    response = _a.sent();
                    // console.log(response);
                    expect(response.id).toBe(1);
                    expect(response.firstname).toBe('first');
                    expect(response.lastname).toBe('last');
                    expect(response.email).toBe('test@example.com');
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing user model create user method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var userData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userData = {
                        firstname: 'first',
                        lastname: 'last',
                        email: 'test2@example.com',
                        password: '1234',
                    };
                    return [4 /*yield*/, userModel.createUser(userData)];
                case 1:
                    response = _a.sent();
                    expect(response.id).toBe(2);
                    expect(response.email).toBe('test2@example.com');
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing user model update user method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var userData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userData = {
                        id: 2,
                        firstname: 'first updated',
                        lastname: 'last',
                        email: 'test2@example.com',
                        password: '1234',
                    };
                    return [4 /*yield*/, userModel.updateUser(userData)];
                case 1:
                    response = _a.sent();
                    expect(response.id).toBe(2);
                    expect(response.firstname).toBe('first updated');
                    expect(response.lastname).toBe('last');
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing user model get one user method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.getUser(1)];
                case 1:
                    response = _a.sent();
                    // console.log(response);
                    expect(response.id).toBe(1);
                    expect(response.firstname).toBe('first');
                    expect(response.lastname).toBe('last');
                    expect(response.email).toBe('test@example.com');
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing user model authenticate user method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.authenticateUser('test@example.com', '12345')];
                case 1:
                    response = _a.sent();
                    expect(response === null || response === void 0 ? void 0 : response.firstname).toBe('first');
                    expect(response === null || response === void 0 ? void 0 : response.lastname).toBe('last');
                    expect(response === null || response === void 0 ? void 0 : response.email).toBe('test@example.com');
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing user model delete user method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, userModel.deleteUser(2)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).not.toThrow();
            return [2 /*return*/];
        });
    }); });
});
