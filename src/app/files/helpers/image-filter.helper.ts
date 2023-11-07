import { Request } from 'express';

export const filterImages = (req: Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new Error('File is empty'), false);

  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Solo se permiten archivos de imagen [jpg, jpeg, png]'), false);
  }

  callback(null, true);
};
