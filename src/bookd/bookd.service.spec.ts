import { Test, TestingModule } from '@nestjs/testing';
import { BookdService } from './bookd.service';

describe('BookdService', () => {
  let service: BookdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookdService],
    }).compile();

    service = module.get<BookdService>(BookdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
