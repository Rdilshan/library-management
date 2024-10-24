import { Test, TestingModule } from '@nestjs/testing';
import { BookdController } from './bookd.controller';
import { BookdService } from './bookd.service';

describe('BookdController', () => {
  let controller: BookdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookdController],
      providers: [BookdService],
    }).compile();

    controller = module.get<BookdController>(BookdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
