import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';
import * as cors from 'cors'
import { NestExpressApplication } from '@nestjs/platform-express';
import { Responses } from './common/response'
import { join } from 'path';
import { HttpFilter } from './common/filter';

async function bootstrap() {

  // 创建一个白名单数组
  const whiteList = ['/user/getUser']
  // 使用NestFactory创建一个NestExpressApplication实例
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  // 中间件，用于控制全局路由
  const middleWareAll = (req: Request, res: Response, next: NextFunction) => {
    // 打印出请求的原始URL
    // console.log('请求头:', req.headers);  // 打印请求头以检查 token
    // console.log(req.originalUrl, '我收全局的')
    console.log('中间件，用于控制全局路由,我收全局的')

    // 拦截
    if (true) {
      next()
    } else {
      // 拦截请求，返回“拦截”
      res.send('拦截')
    }
  }

  // 启用版本控制，将版本号放在URI中
  app.enableVersioning({
    type: VersioningType.URI
  });

  // swagger配置
  // 创建一个DocumentBuilder实例
  const options = new DocumentBuilder()
    // 设置文档标题
    .setTitle("TiAmo的项目")
    // 设置文档描述
    .setDescription("demo项目")
    // 设置文档版本
    .setVersion("1.0")
    // 构建文档
    .build();

  // 使用SwaggerModule创建文档
  const documents = SwaggerModule.createDocument(app, options);
  // 设置SwaggerModule，并启动
  SwaggerModule.setup("docs", app, documents);

  // 使用 cors 中间件，允许跨域请求
  app.use(cors());

  // 使用 session 中间件，用于处理状态管理，如登录状态
  app.use(session({ secret: "TiAmo", name: "TiAmo", rolling: true, cookie: { maxAge: null } }));

  // 使用中间件 All
  // app.use(middleWareAll);


  // 使用静态资源
  app.useStaticAssets(join(__dirname, "file"), {
    prefix: "/file"
  });

  // 使用全局拦截器，拦截响应
  app.useGlobalInterceptors(new Responses());

  // 使用全局过滤器，过滤HTTP请求
  app.useGlobalFilters(new HttpFilter());


  await app.listen(3001);
}
bootstrap();
