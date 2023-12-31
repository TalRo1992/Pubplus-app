"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../auth");
const router = express_1.default.Router();
const userController = new userController_1.UserController();
router.get('', auth_1.ensureAuthenticated, userController.getUsers);
router.put('/status/:id', auth_1.ensureAuthenticated, userController.updateUserStatus);
exports.default = router;
