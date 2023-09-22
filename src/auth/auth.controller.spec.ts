import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('create', () => {
    it('debe crear un nuevo auth', () => {
      const createAuthDto: CreateAuthDto = {
        username: 'testuser',
        password: 'testpassword',
      };
      jest
        .spyOn(service, 'create')
        .mockReturnValue('This action adds a new auth');
      expect(controller.create(createAuthDto)).toEqual(
        'This action adds a new auth',
      );
    });
  });

  describe('findAll', () => {
    it('debe devolver todos los auth', () => {
      jest
        .spyOn(service, 'findAll')
        .mockReturnValue('This action returns all auth');
      expect(controller.findAll()).toEqual('This action returns all auth');
    });
  });

  describe('findOne', () => {
    it('debe devolver un auth específico', () => {
      const id = '1';
      jest
        .spyOn(service, 'findOne')
        .mockReturnValue(`This action returns a #${id} auth`);
      expect(controller.findOne(id)).toEqual(
        `This action returns a #${id} auth`,
      );
    });
  });

  describe('update', () => {
    it('debe actualizar un auth específico', () => {
      const id = '1';
      const updateAuthDto: UpdateAuthDto = {
        username: 'testuser',
        password: 'testpassword',
      };
      jest
        .spyOn(service, 'update')
        .mockReturnValue(`This action updates a #${id} auth`);
      expect(controller.update(id, updateAuthDto)).toEqual(
        `This action updates a #${id} auth`,
      );
    });
  });

  describe('remove', () => {
    it('debe eliminar un auth específico', () => {
      const id = '1';
      jest
        .spyOn(service, 'remove')
        .mockReturnValue(`This action removes a #${id} auth`);
      expect(controller.remove(id)).toEqual(
        `This action removes a #${id} auth`,
      );
    });
  });
});
