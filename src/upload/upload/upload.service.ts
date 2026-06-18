import { Injectable } from '@nestjs/common';
import type {} from 'multer';
import cloudinary from '../config/cloudinary.config';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'websiteduoclieu' }, (error, result) => {
          if (error) {
            return reject(new Error(error.message));
          }

          resolve(result);
        })
        .end(file.buffer);
    });
  }
}
