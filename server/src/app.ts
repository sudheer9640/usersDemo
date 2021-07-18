// NPM Module imports
import express, {Express} from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import passport from 'passport';

// Dev imports
import usersRouter from './routes/userRouter';
import { connectToDB } from './mongoDb/connection';
import authRouter from './routes/authRouter';
import { addResponseHeaders } from './middleware';
import {envConstants} from './config/envConfig';
import  './config/passport';

const app: Express = express();

// mount json form parser
app.use(bodyParser.json());

// mount query string parser
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());

app.all('*', addResponseHeaders);

// Adding the routes
app.use('/auth', authRouter);
app.use('/users',  usersRouter);

/* It removes 'X-Powered-By: Express' header to avoid disclosure the app engine */
app.disable('x-powered-by');

app.set('port', envConstants.PORT);

app.get('/healthcheck', (req, res) => {
  res.send('Server Online');
});

// connect to mongodb
connectToDB();

export default app;
