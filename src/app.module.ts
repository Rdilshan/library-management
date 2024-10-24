import { Module ,NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MembersModule } from './members/members.module';
import { BookdModule } from './bookd/bookd.module';
import { BorrowBookModule } from './borrow-book/borrow-book.module';


//middlware
import {SuperadminLoggerMiddleware} from "./common/middlware/checkingsuperadmin.middlware";
import { AdminLoggerMiddleware } from './common/middlware/checkingadmin.middlware';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    ConfigModule.forRoot(),DatabaseModule, AdminModule, MembersModule, BookdModule, BorrowBookModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SuperadminLoggerMiddleware)
      .exclude(
        { path: 'admin/login', method: RequestMethod.POST }
      )
      .forRoutes('admin');

      consumer
      .apply(AdminLoggerMiddleware)
      .forRoutes('bookd','borrow-book','members');
  }


}
