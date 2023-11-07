import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class FilesService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  subirImagenes(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se ha enviado ningún archivo.');
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              message: 'imagen subido con éxito',
              url: result.url,
              filename: file.originalname,
            });
          }
        })
        .end(file.buffer);
    });
  }

  subirArchivos(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se ha enviado ningún archivo.');
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              message: 'archivo subido con éxito',
              url: result.url,
              filename: file.originalname,
            });
          }
        })
        .end(file.buffer);
    });
  }
}
