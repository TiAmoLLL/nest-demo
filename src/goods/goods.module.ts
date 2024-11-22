import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { Goods } from './entities/goods.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/logger/logger.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Goods])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule implements NestModule {

  // 中间件，token验证
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('goods')
  }
}
