import express from 'express';
import {
  createProduct,
  getProducts,
} from '../controllers/products.controllers.js';
import { createProductSchema } from '../schemas/products.schemas.js';
import { validateBody } from '../middlewares/validation.middlewares.js';

const router = express.Router();
router
  .route('/')
  .get(getProducts)
  .post(validateBody(createProductSchema), createProduct);

export default router;
