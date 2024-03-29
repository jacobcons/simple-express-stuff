import express from 'express';
import tasks from './tasks/tasks.routes.js';
import { errorHandler, notFound } from './middlewares.js';

const app = express();

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandler);

export { app };
