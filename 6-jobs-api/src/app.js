import express from 'express';
import authRouter from './features/auth/auth.routes.js';
import jobsRouter from './features/jobs/jobs.routes.js';
import { errorHandler, notFound } from './middlewares.js';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFound);
app.use(errorHandler);

export { app };
