import express from 'express';
import { dashboard, login } from './main.controllers.js';
import { auth, validateBody, validateQuery } from '../middlewares.js';
import { loginSchema, dashboardSchema } from './main.schemas.js';

const router = express.Router();

router.route('/dashboard').get(auth, validateQuery(dashboardSchema), dashboard);

router.route('/login').post(validateBody(loginSchema), login);

export default router;
