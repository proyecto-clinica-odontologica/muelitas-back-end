import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('debería estar definido', () => {
    expect(authController).toBeDefined();
  });

  describe('create', () => {
    it('debería llamar a authService.create con los parámetros correctos', async () => {
      const createAuthDto: CreateAuthDto = {
        email: 'test@example.com',
        password: 'Password1',
        fullName: 'Test User',
      };

      authController.create(createAuthDto);

      expect(authService.create).toHaveBeenCalledWith(createAuthDto);
    });
  });

  describe('findAll', () => {
    it('debería llamar a authService.findAll', async () => {
      authController.findAll();

      expect(authService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debería llamar a authService.findOne con los parámetros correctos', async () => {
      const id = '12345';

      authController.findOne(id);

      expect(authService.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('debería llamar a authService.update con los parámetros correctos', async () => {
      const id = '12345';
      const updateAuthDto: UpdateAuthDto = {
        email: 'updated@example.com',
        password: 'UpdatedPassword1',
        fullName: 'Updated User',
      };

      authController.update(id, updateAuthDto);

      expect(authService.update).toHaveBeenCalledWith(+id, updateAuthDto);
    });
  });

  describe('remove', () => {
    it('debería llamar a authService.remove con los parámetros correctos', async () => {
      const id = '12345';

      authController.remove(id);

      expect(authService.remove).toHaveBeenCalledWith(+id);
    });
  });
});
