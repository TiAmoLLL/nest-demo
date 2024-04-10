import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { zip } from 'compressing'
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { join } from 'path';

@ApiTags("文件上传")
@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file)
    // return this.uploadService.create(createUploadDto); 
    return '测试上传'
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
