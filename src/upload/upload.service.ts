import { Injectable } from '@nestjs/common';
import { zip } from 'compressing';
import { Response } from 'express';
import { join } from 'path';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ReturnType } from '../types/return-type.interface';
@Injectable()
export class UploadService {
  async upload(file: any): Promise<ReturnType> {
    console.log('上传file', file);
    const filePath = join(__dirname, '../file', file.filename);
    return {
      code: 200,
      message: '文件上传成功',
      success: true,
      data: {
        originalName: file.originalname,
        filename: file.filename,
        path: "/file/" + file.filename,
        size: file.size,
        mimetype: file.mimetype,
      },
    }
  }
  download(name: string) {

  }
  async down(name: string, res: Response) {
    const url = join(__dirname, '../file/1709260919724.jpg')
    const tarStream = new zip.Stream()
    await tarStream.addEntry(url)
    // return tarStream
    res.setHeader('Content-Type', 'application/octet-stream');

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=tx`,
    );

    tarStream.pipe(res)
  }
  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload';
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
