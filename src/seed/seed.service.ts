import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateRolDto } from '../auth/dto/create-rol-dto';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { Rol } from '../auth/entities/role.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: AuthService,

    @InjectRepository(Rol)
    private readonly dbRol: Repository<Rol>,

    @InjectRepository(User)
    private readonly dbUser: Repository<User>,

    private readonly configService: ConfigService,
  ) {}

  async seed() {
    await this.eliminarRoles();
    await this.agregarRoles();

    await this.eliminarUsuarios();
    await this.agregarUsuarios();

    return 'Seeding completado';
  }

  private async eliminarRoles() {
    const query = this.dbRol.createQueryBuilder('rol');
    await query.delete().where({}).execute();
  }

  private async eliminarUsuarios() {
    const query = this.dbUser.createQueryBuilder('user');
    await query.delete().where({}).execute();
  }

  private async agregarRoles() {
    const roles: string[] = ['god', 'admin', 'docente', 'estudiante'];
    let i = 1;
    for (let rol of roles) {
      const rolDto: CreateRolDto = { nombre: rol, id: i++ };
      await this.userService.createRoles(rolDto);
    }
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
