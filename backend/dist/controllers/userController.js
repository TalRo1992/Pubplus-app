"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    getUsers(req, res) {
        return userService_1.UserService.getUsers(req, res);
    }
    updateUserStatus(req, res) {
        return userService_1.UserService.updateUserStatus(req, res);
    }
}
exports.UserController = UserController;
