import express from 'express';
import { registerSchema, loginSchema } from './auth.schemas.js';
import { validateBody } from '../../middlewares.js';

import { login, register } from './auth.controllers.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/login', validateBody(loginSchema), login);

export default router;
