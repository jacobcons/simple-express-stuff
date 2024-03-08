import express from 'express';
import main from './main/main.routes.js';
import { errorHandler, notFound } from './middlewares.js';
import morgan from 'morgan';
import { basePath } from './utils.js';

const app = express();

app.use(express.static(basePath('./public')));
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/v1/', main);

app.use(notFound);
app.use(errorHandler);

export { app };
