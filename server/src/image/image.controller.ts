import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';
import { numbers } from 'src/@common/constants';
import * as fs from 'fs';

try {
  fs.readdirSync('uploads');
} catch (error) {
  fs.mkdirSync('uploads');
}

@Controller('images')
@UseGuards(AuthGuard())
export class ImageController {
  @UseInterceptors(
    FilesInterceptor('images', numbers.MAX_IMAGE_COUNT, {
      storage: diskStorage({
        destination(reg, file, cb) {
          cb(null, 'uploads/');
        },
        filename(reg, file, cb) {
          const ext = extname(file.originalname);
          cb(null, basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
      limits: { fileSize: numbers.MAX_IMAGE_SIZE },
    }),
  )
  @Post('/')
  uploadImages(@UploadedFile() files: Express.Multer.File[]) {
    const uris = files.map((file) => file.filename);
  }
}
