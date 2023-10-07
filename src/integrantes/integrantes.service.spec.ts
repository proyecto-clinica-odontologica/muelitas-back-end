import { Test, TestingModule } from '@nestjs/testing';
import { IntegrantesService } from './integrantes.service';

describe('IntegrantesService', () => {
  let service: IntegrantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntegrantesService],
    }).compile();

    service = module.get<IntegrantesService>(IntegrantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
