import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debe crear una nueva autenticación', () => {
      const createAuthDto: CreateUserDto = {
        email: 'test@test.com',
        fullName: 'testuser',
        password: 'testpassword',
      };
      expect(service.create(createAuthDto)).toEqual(
        'This action adds a new auth',
      );
    });
  });

  describe('findAll', () => {
    it('debe devolver todas la autenticaciónes registradas', () => {
      expect(service.findAll()).toEqual('This action returns all auth');
    });
  });

  describe('findOne', () => {
    it('debe devolver una autenticación específica', () => {
      const id = 1;
      expect(service.findOne(id)).toEqual(`This action returns a #${id} auth`);
    });
  });

  describe('update', () => {
    it('debe actualizar una autenticación específica', () => {
      const id = 1;
      const updateAuthDto: UpdateUserDto = {
        fullName: 'testuser',
        password: 'testpassword',
      };
      expect(service.update(id, updateAuthDto)).toEqual(
        `This action updates a #${id} auth`,
      );
    });
  });

  describe('remove', () => {
    it('debe eliminar una autenticación específica', () => {
      const id = 1;
      expect(service.remove(id)).toEqual(`This action removes a #${id} auth`);
    });
  });
});
