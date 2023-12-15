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
exports.UserService = void 0;
const db = require('../db-config/db');
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../auth");
const LocalStrategy = require('passport-local').Strategy;
passport_1.default.use(new LocalStrategy(function (username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const userResult = yield fetchUsers(username);
        let errMsg = 'Wrong email or password';
        if (!userResult) {
            return done(null, false, { message: errMsg });
        }
        const isMatch = yield (0, auth_1.verifyPassword)(password, userResult.password);
        if (!isMatch) {
            return done(null, false, { message: errMsg });
        }
        else {
            return done(null, userResult);
        }
    });
}));
passport_1.default.serializeUser(function (user, done) {
    done(null, user.username);
});
passport_1.default.deserializeUser(function (username, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield fetchUsers(username);
        done(null, user);
    });
});
function fetchUsers(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield db.getConnection();
            yield connection.beginTransaction();
            const query = `SELECT * FROM users WHERE username = '${username}'`;
            const results = yield connection.query(query);
            yield connection.commit();
            const result = results[0];
            connection.release();
            return result[0];
        }
        catch (e) {
            console.log('Internal error', e);
            throw 'Internal server error';
        }
    });
}
class UserService {
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req === null || req === void 0 ? void 0 : req.user;
            if (!username) {
                return res.status(500).json({ message: 'User name do not exist' });
            }
            const connection = yield db.getConnection();
            const getUsersQuery = `SELECT * FROM users WHERE username <> '${username}'`;
            try {
                const users = yield connection.query(getUsersQuery);
                yield connection.commit();
                connection.release();
                res.json(users[0]);
            }
            catch (e) {
                connection.release();
                throw 'Internal server error';
            }
        });
    }
    static updateUserStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield db.getConnection();
            const { status } = req.body;
            const { id } = req.params;
            const updateStatusQuery = `UPDATE users SET status = '${status}' WHERE id = ${id};`;
            try {
                yield connection.query(updateStatusQuery);
                yield connection.commit();
                connection.release();
                res.status(200).json({ message: 'Uset status updated' });
            }
            catch (e) {
                connection.release();
                throw 'Internal server error';
            }
        });
    }
}
exports.UserService = UserService;
