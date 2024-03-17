import express from 'express';
import { uploadImageLocally } from '../controllers/uploadImage.controllers.js';

const router = express.Router();

router.post('/', uploadImageLocally);
export default router;
