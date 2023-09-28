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
        nombre: 'Maycol',
        apellido: 'Rodriguez',
        numDocumento: '11111111',
        contra: this.configService.get('USER_PASS'),
        correo: 'maycol@example.com',
        celular: '123456789',
        rol: 'god',
      },
      {
        nombre: 'Jhamil',
        apellido: 'Huaman Verastein',
        numDocumento: '22222222',
        contra: this.configService.get('USER_PASS'),
        correo: 'jhamil@example.com',
        rol: 'god',
      },
    ];

    for (let userData of users) {
      try {
        await this.userService.create(userData);
      } catch (error) {
        throw error;
      }
    }
  }
}
