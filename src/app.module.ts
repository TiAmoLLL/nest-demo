import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { GuardModule } from './guard/guard.module';
import { AuthModule } from './auth/auth.module';
import { GoodsModule } from './goods/goods.module';
import { AdminUserModule } from './admin_user/admin_user.module';
import { LoggerMiddlewareAll } from './middlewares/logger.middlewareAll';
@Module({
  imports: [
    // 连接数据库
    TypeOrmModule.forRoot({
      type: "mysql", //数据库类型
      username: "root", //账号
      password: "123456", //密码
      host: "localhost", //host
      port: 3306, //
      database: "lzy_sql", //库名
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10,//重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中

    }),
    UserModule,
    UploadModule,
    GuardModule,
    AuthModule,
    GoodsModule,
    AdminUserModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 使用 apply() 方法将 LoggerMiddlewareAll 应用到所有路由
    consumer
      .apply(LoggerMiddlewareAll)  // 注册 LoggerMiddlewareAll 中间件
      .forRoutes('*');             // 适用于所有路由
  }
}
