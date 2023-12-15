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
exports.AuthService = void 0;
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
        console.log(isMatch, password, userResult.password);
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
passport_1.default.deserializeUser(function (id, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield fetchUsers(id);
        done(null, user);
    });
});
function fetchUsers(fieldFilter) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield db.getConnection();
        yield connection.beginTransaction();
        const query = `SELECT * FROM users WHERE username = '${fieldFilter}'`;
        try {
            const results = yield connection.query(query);
            yield connection.commit();
            const result = results[0];
            connection.release();
            return result[0];
        }
        catch (e) {
            connection.release();
            throw 'Internal error';
        }
    });
}
class AuthService {
    static handleLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                passport_1.default.authenticate('local', (err, user, info) => {
                    if (err) {
                        return res.status(500).json({ message: 'Server error', err });
                    }
                    if (!user) {
                        return res.status(401).json({ message: (info === null || info === void 0 ? void 0 : info.message) && info.message || 'Authentication failed', info });
                    }
                    req.logIn(user, (err) => {
                        if (err) {
                            return res.status(500).json({ message: 'Server error', err });
                        }
                        return res.status(200).json({ message: 'Authentication succeeded', user });
                    });
                })(req, res, next);
            }
            catch (e) {
                return res.status(500).json({ message: 'Internal error', e });
            }
        });
    }
    static handleCheck(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({ message: 'Authentication success', user: req.user });
        });
    }
    static handleLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.destroy((err) => {
                if (err) {
                    console.log('Error:', err);
                }
            });
            return res.status(200).json({ message: 'Loged out', user: null });
        });
    }
}
exports.AuthService = AuthService;
