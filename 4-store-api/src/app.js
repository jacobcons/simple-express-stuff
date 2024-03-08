import express from 'express';
import products from './products/products.routes.js';
import { errorHandler, notFound } from './middlewares.js';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/v1/products', products);

app.use(notFound);
app.use(errorHandler);

export { app };
