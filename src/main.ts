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

  const whiteList = ['/user/getUser']
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 全局中间件
  const middleWareAll = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.originalUrl, '我收全局的')

    if (true) {
      next()
    } else {
      res.send('小黑子露出鸡脚了吧')
    }
  }
  app.enableVersioning({
    type: VersioningType.URI
  })
  // swagger配置
  const options = new DocumentBuilder()
    .setTitle("TiAmo的项目")
    .setDescription("demo项目")
    .setVersion("1.0")
    .build();

  const documents = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, documents);

  app.use(cors())
  app.use(session({ secret: "TiAmo", name: "TiAmo", rolling: true, cookie: { maxAge: null } }))
  app.use(middleWareAll)
  app.useStaticAssets(join(__dirname, "file"), {
    prefix: "/file"
  })
  app.useGlobalInterceptors(new Responses())
  app.useGlobalFilters(new HttpFilter())

  await app.listen(3001);
}
bootstrap();
