import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AdminUserService } from './admin_user.service';
import { AdminUserController } from './admin_user.controller';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './entities/admin_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  controllers: [AdminUserController],
  providers: [AdminUserService],
  exports: [AdminUserService]
})
export class AdminUserModule {

}
