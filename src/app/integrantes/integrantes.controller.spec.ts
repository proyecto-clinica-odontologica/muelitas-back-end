import { Test, TestingModule } from '@nestjs/testing';
import { IntegrantesController } from './integrantes.controller';
import { IntegrantesService } from './integrantes.service';

describe('IntegrantesController', () => {
  let controller: IntegrantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegrantesController],
      providers: [IntegrantesService],
    }).compile();

    controller = module.get<IntegrantesController>(IntegrantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
