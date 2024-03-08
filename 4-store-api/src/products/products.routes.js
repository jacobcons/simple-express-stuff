import express from 'express';
import { getProducts, getProductsStatic } from './products.controllers.js';
import { getProductsSchema } from './products.schemas.js';
import { validateQuery } from '../middlewares.js';

const router = express.Router();

router.route('/').get(validateQuery(getProductsSchema), getProducts);

router.route('/static').get(getProductsStatic);

export default router;
