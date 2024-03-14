import express from 'express';
import { validateBody } from '../middlewares/validation.middlewares.js';
import { updateUserSchema } from '../schemas/users.schemas.js';
import { getUser, updateUser } from '../controllers/users.controllers.js';

const router = express.Router();

router
  .route('/me')
  .get(getUser)
  .patch(validateBody(updateUserSchema), updateUser);

export default router;
