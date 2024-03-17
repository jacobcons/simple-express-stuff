import { remove } from 'fs-extra/esm';
import { createError } from '../utils/errors.utils.js';
import { MAX_UPLOAD_SIZE_MB } from '../constants/uploadImage.constants.js';
import { basePath } from '../utils/path.utils.js';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export const uploadImageLocally = async (req, res) => {
  const { image } = req.files;
  const { tempFilePath } = image;

  if (!image) {
    await remove(tempFilePath);
    throw createError(400, 'No image field provided');
  }

  if (!image.mimetype.startsWith('image')) {
    await remove(tempFilePath);
    throw createError(400, 'Upload must be an image ');
  }

  if (image.truncated) {
    await remove(tempFilePath);
    throw createError(400, `Upload cannot exceed ${MAX_UPLOAD_SIZE_MB}MB`);
  }

  const newImageName = `${uuidv4()}${extname(image.name)}`;
  await image.mv(basePath('public', 'uploads', newImageName));

  res.json({
    url: `/uploads/${newImageName}`,
  });
};
