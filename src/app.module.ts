import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MembersModule } from './members/members.module';
import { BookdModule } from './bookd/bookd.module';
import { BorrowBookModule } from './borrow-book/borrow-book.module';

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
export class AppModule {}
