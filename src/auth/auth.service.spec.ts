import { Repository } from "typeorm";
import { AuthService } from "./auth.service";
import { User } from "./entities/user.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";


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
        correo: 'ejemplo@ejemplo.com',
        contra: 'Contra1234!',
        numDocumento: '12345678',
        nombre: 'juan',
        apellido: 'perez',
      };

      await authService.create(createUserDto);

      expect(userRepositoryMock.create).toBeCalled(); // Simplemente verifica que fue llamada
      expect(userRepositoryMock.save).toBeCalled();
    });
  });
});
