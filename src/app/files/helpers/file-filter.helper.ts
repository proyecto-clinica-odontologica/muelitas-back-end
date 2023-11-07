import { Request } from 'express';

export const filterFiles = (req: Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new Error('File is empty'), false);

  if (!file.originalname.match(/\.(pdf|docx)$/)) {
    return callback(new Error('Solo se permiten archivos como [pdf, docx]'), false);
  }

  callback(null, true);
};
