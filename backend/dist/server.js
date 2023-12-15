"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const initdb_1 = require("./initdb");
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 's0m37hing_s3<r3t',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/users', userRouter_1.default);
app.use('/auth', authRouter_1.default);
(0, initdb_1.runInitScript)();
app.listen(port, () => {
    console.log(`[Server]: I am running at http://localhost:${port}`);
});
