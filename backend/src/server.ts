import express, {Express} from 'express';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';
const session = require('express-session');

const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const app: Express = express();
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

app.use('/users', userRouter);

app.use('/auth', authRouter);


app.listen(port, ()=> {
console.log(`[Server]: I am running at http://localhost:${port}`);
});