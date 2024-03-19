import express from 'express';
import 'express-async-errors';
import { errorHandler, notFound } from './middlewares/errors.middlewares.js';
import morgan from 'morgan';
import { errors as celebrateErrorHandler } from 'celebrate';
import { createPaymentIntent } from './controllers/stripe.controllers.js';
import { createPaymentIntentSchema } from './schemas/stripe.schemas.js';
import { validateBody } from './middlewares/validation.middlewares.js';
const app = express();

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());

app.post(
  '/create-payment-intent',
  validateBody(createPaymentIntentSchema),
  createPaymentIntent,
);

app.use(notFound);
app.use(celebrateErrorHandler());
app.use(errorHandler);

export { app };
