import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      console.log('Received file:', file);
      if (!file || !file.buffer) {
        return reject(new Error('File buffer is empty'));
      }

      const uploadStream = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      // Mengonversi buffer gambar ke aliran (stream)
      const imageStream = Readable.from(file.buffer);

      imageStream.pipe(uploadStream);
    });
  }
}
