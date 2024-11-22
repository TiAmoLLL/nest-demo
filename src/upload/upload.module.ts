import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { LoggerMiddleware } from 'src/logger/logger.middleware';

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, '../file/'),
      filename: (_, file, callback) => {
        const fileName = `${new Date().getTime() + extname(file.originalname)}`
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
export class UploadModule implements NestModule {
  // 中间件，token验证
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('file')
  }
}
