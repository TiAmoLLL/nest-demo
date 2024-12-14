import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { LoggerMiddleware } from 'src/logger/logger.middleware';

@Module({
  imports: [MulterModule.register({
    // 定义存储方式为diskStorage
    storage: diskStorage({
      // 指定文件存储路径
      destination: join(__dirname, '../file/'),
      // 指定文件名
      filename: (_, file, callback) => {
        // 获取当前时间戳
        const fileName = `${new Date().getTime() + extname(file.originalname)}`
        // 返回文件名
        return callback(null, fileName)
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 限制文件大小为 10MB
    fileFilter: (_, file, callback) => {
      // 允许的文件类型
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.mimetype)) {
        callback(new Error('Invalid file type'), false);
      } else {
        callback(null, true);
      }
    },
  },

  )],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {

}
