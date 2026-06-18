import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type {} from 'multer';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @ApiOperation({ summary: 'Upload anh len Cloudinary' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File anh can upload',
        },
      },
      required: ['file'],
    },
  })
  @ApiCreatedResponse({
    description: 'Upload anh thanh cong',
    schema: {
      example: {
        secure_url:
          'https://res.cloudinary.com/websiteduoclieu/image/upload/v123/websiteduoclieu/example.jpg',
        public_id: 'websiteduoclieu/example',
      },
    },
  })
  @ApiBadRequestResponse({ description: 'File upload khong hop le' })
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadImage(file);
  }
}
