import express from 'express';
import 'express-async-errors';
import { errorHandler, notFound } from './middlewares/errors.middlewares.js';
import morgan from 'morgan';
import { errors as celebrateErrorHandler } from 'celebrate';
import {sendEmail} from './controllers/sendEmail.controllers.js';

const app = express();

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());

app.post('/send-email', sendEmail);

app.use(notFound);
app.use(celebrateErrorHandler());
app.use(errorHandler);

export { app };
