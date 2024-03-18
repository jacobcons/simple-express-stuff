import express from 'express';
import 'express-async-errors';
import productsRouter from './routes/products.routes.js';
import {uploadImage} from './controllers/uploadImage.controllers.js';
import { errorHandler, notFound } from './middlewares/errors.middlewares.js';
import morgan from 'morgan';
import { errors as celebrateErrorHandler } from 'celebrate';
import fileUpload from 'express-fileupload';
import { MAX_UPLOAD_SIZE_BYTES } from './constants/uploadImage.constants.js';

const app = express();

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());

app.post(
  '/api/v1/upload-image',
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: MAX_UPLOAD_SIZE_BYTES },
  }),
  uploadImage,
);
app.use('/api/v1/products', productsRouter);

app.use(notFound);
app.use(celebrateErrorHandler());
app.use(errorHandler);

export { app };
