"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
class AuthController {
    handleLogin(req, res, next) {
        return authService_1.AuthService.handleLogin(req, res, next);
    }
    handleCheck(req, res) {
        return authService_1.AuthService.handleCheck(req, res);
    }
    handleLogout(req, res) {
        return authService_1.AuthService.handleLogout(req, res);
    }
}
exports.AuthController = AuthController;
