import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { GoodsAdminController } from './goods.admin.controller';
import { Goods } from './entities/goods.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/logger/logger.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Goods])],
  controllers: [GoodsController, GoodsAdminController],
  providers: [GoodsService],
})
export class GoodsModule {


}
