import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type {} from 'multer';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles/roles.guard';
import { Roles } from '../../auth/decorator/roles.decorator';
import { UserRole } from '../../users/enum/enum.userrole';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Chua dang nhap' })
  @ApiForbiddenResponse({ description: 'Khong phai admin' })
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
