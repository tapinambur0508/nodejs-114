import cloudinary from 'cloudinary';

import { getEnvVariable } from './getEnvVariable.js';

cloudinary.v2.config({
  cloud_name: getEnvVariable('CLOUDINARY_CLOUD_NAME'),
  api_key: getEnvVariable('CLOUDINARY_API_KEY'),
  api_secret: getEnvVariable('CLOUDINARY_API_SECRET'),
});

export function uploadToCloudinary(filePath) {
  return cloudinary.v2.uploader.upload(filePath);
}
