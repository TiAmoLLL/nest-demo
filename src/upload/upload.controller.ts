import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { zip } from 'compressing'
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { ReturnType } from '../types/return-type.interface';
@ApiTags("文件上传")
@Controller('file')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file): Promise<ReturnType> {
    console.log(file)
    // 检查文件是否上传成功
    if (!file) {
      return {
        code: 400,
        message: 'No file uploaded',
        success: false,
        data: 'No file uploaded'
      };
    }
    return this.uploadService.upload(file);

  }

  @Get('download')
  download(@Res() res: Response) {
    const url = join(__dirname, '../file/1709178485304.jpg')
    res.download(url)
    // return this.uploadService.findAll();
  }
  @Get('export')
  async down(@Res() res: Response) {
    // const url = join(__dirname, '../file/1709178485304.jpg')
    // const tarStream = new zip.Stream()
    // await tarStream.addEntry(url)
    res.setHeader('Content-Type', 'application/octet-stream');

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=tx`,
    );

    // tarStream.pipe(res)
    this.uploadService.down('1709260919724.jpg', res)
  }

}
