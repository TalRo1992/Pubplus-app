"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../auth");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
const authController = new authController_1.AuthController();
router.get('/check', auth_1.ensureAuthenticated, authController.handleCheck);
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error:', err);
        }
    });
    return res.status(200).json({ message: 'Loged out', user: null });
});
router.post('/login', authController.handleLogin);
exports.default = router;
