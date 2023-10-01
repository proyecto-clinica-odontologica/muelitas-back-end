import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepositoryMock: Partial<jest.Mocked<Repository<User>>>;

  beforeEach(async () => {
    userRepositoryMock = {
      create: jest.fn().mockImplementation((user) => user),
      save: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('create', () => {
    it('crea un usuario', async () => {
      const createUserDto: CreateUserDto = {
        Correo: 'ejemplo@ejemplo.com',
        Contra: 'Contra1234!',
        NumDoc: '12345678',
        Nombre: 'juan',
        Apellido: 'perez',
      };

      await authService.crearCuenta(createUserDto);

      expect(userRepositoryMock.create).toBeCalled(); // Simplemente verifica que fue llamada
      expect(userRepositoryMock.save).toBeCalled();
    });
  });
});
