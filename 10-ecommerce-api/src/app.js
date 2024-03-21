import express from 'express';
import 'express-async-errors';
import authRouter from './routes/auth.routes.js';
import { errorHandler, notFound } from './middlewares/errors.middlewares.js';
import morgan from 'morgan';
import { verifyToken } from './middlewares/auth.middlewares.js';
import { errors as celebrateErrorHandler } from 'celebrate';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.use(notFound);
app.use(celebrateErrorHandler());
app.use(errorHandler);

export { app };
