import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { filterImages } from './helpers/image-filter.helper';
import { filterFiles } from './helpers/file-filter.helper';

@Controller('upload')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('images')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: filterImages,
    }),
  )
  subirImagenes(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.subirImagenes(file);
  }

  @Post('files')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: filterFiles,
    }),
  )
  subirArchivos(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.subirArchivos(file);
  }
}
