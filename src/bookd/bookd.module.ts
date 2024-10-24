import { Module } from '@nestjs/common';
import { BookdService } from './bookd.service';
import { BookdController } from './bookd.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports : [DatabaseModule],
  controllers: [BookdController],
  providers: [BookdService],
})
export class BookdModule {}
