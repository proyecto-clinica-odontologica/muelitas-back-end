import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: AuthService,

    @InjectRepository(User)
    private readonly dbUser: Repository<User>,

    private readonly configService: ConfigService,
  ) {}

  async seed() {
    await this.eliminarUsuarios();
    await this.agregarUsuarios();

    return 'Seeding completado';
  }

  private async eliminarUsuarios() {
    const query = this.dbUser.createQueryBuilder('user');
    await query.delete().where({}).execute();
  }

  private async agregarUsuarios() {
    const users: CreateUserDto[] = [
      {
        Nombre: 'Maycol',
        Apellido: 'Rodriguez',
        NumDoc: '11111111',
        Contra: this.configService.get('USER_PASS'),
        Correo: 'maycol@example.com',
        Celular: '123456789',
        Rol: 'god',
      },
      {
        Nombre: 'Jhamil',
        Apellido: 'Huaman Verastein',
        NumDoc: '22222222',
        Contra: this.configService.get('USER_PASS'),
        Correo: 'jhamil@example.com',
        Rol: 'god',
      },
    ];

    for (let userData of users) {
      try {
        await this.userService.crearCuenta(userData);
      } catch (error) {
        throw error;
      }
    }
  }
}
