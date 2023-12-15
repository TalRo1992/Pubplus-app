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
exports.runInitScript = void 0;
const fs_1 = __importDefault(require("fs"));
const db = require('./db-config/db');
const path_1 = __importDefault(require("path"));
const runInitScript = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sqlScriptPath = path_1.default.join(__dirname, '../init.sql');
        const sqlScript = fs_1.default.readFileSync(sqlScriptPath, 'utf8');
        const connection = yield db.getConnection();
        yield connection.query(sqlScript);
        yield connection.end();
        console.log('Initialization script executed successfully.');
    }
    catch (error) {
        console.error('Error executing initialization script:', error);
    }
});
exports.runInitScript = runInitScript;
