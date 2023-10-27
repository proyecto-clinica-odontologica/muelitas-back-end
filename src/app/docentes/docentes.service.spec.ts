import { Test, TestingModule } from '@nestjs/testing';
import { DocentesService } from './docentes.service';

describe('DocentesService', () => {
  let service: DocentesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocentesService],
    }).compile();

    service = module.get<DocentesService>(DocentesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
