"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const loginService_1 = require("../services/loginService");
class LoginController {
    handleLogin(req, res, next) {
        return loginService_1.LoginService.handleLogin(req, res, next);
    }
}
exports.LoginController = LoginController;
