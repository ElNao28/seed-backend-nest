import {
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadImageDto } from './dto/upload-image.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { GetImageDto } from './dto/get-image.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';

@Controller('upload-files')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image',
    type: UploadImageDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  @Authorization()
  @Post('image')
  public uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image/jpg|jpeg|png' })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadFilesService.saveFileLocal('images', file);
  }

  @Public()
  @Get()
  public getImage(@Res() response: any, @Query() fileName: GetImageDto) {
    return this.uploadFilesService.getLocalFile(fileName.filePath, response);
  }
}
