import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            create: jest.fn(),
            login: jest.fn(),
            cambiarPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('debería ser definido', () => {
    expect(controller).toBeDefined();
  });

  describe('registro', () => {
    it('debería registrar un usuario', async () => {
      const createUserDto: CreateUserDto = {
        correo: 'maycool3@goOglE.com',
        contra: 'Abc123',
        numDocumento: '74583012',
        nombre: 'maycol',
        apellido: 'rodriguez',
        rol: 'admin',
      };

      await controller.create(createUserDto);

      expect(authService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('debería hacer login con un usuario', async () => {
      const loginUserDto: LoginUserDto = {
        correo: 'maycool3@google.com',
        contra: 'Abc457',
      };

      await controller.login(loginUserDto);

      expect(authService.login).toHaveBeenCalledWith(loginUserDto);
    });
  });

  describe('cambiarPassword', () => {
    it('debería cambiar la contraseña', async () => {
      const id = 1;
      const changePasswordDto: ChangePasswordDto = {
        contraActual: 'Abc123',
        contraNueva: 'Abc1234',
        repiteContraNueva: 'Abc1234',
      };

      await controller.cambiarPassword(id, changePasswordDto);

      expect(authService.cambiarPassword).toHaveBeenCalledWith(
        id,
        changePasswordDto,
      );
    });
  });
});
