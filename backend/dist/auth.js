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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.ensureAuthenticated = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).send();
};
exports.ensureAuthenticated = ensureAuthenticated;
const verifyPassword = (enteredPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield bcrypt_1.default.compare(enteredPassword, hashedPassword);
        return match;
    }
    catch (error) {
        throw error;
    }
});
exports.verifyPassword = verifyPassword;
