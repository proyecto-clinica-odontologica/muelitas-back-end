import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CreateRolDto } from 'src/auth/dto/create-rol-dto';
import { Rol } from 'src/auth/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: AuthService,

    @InjectRepository(Rol)
    private readonly dbRol: Repository<Rol>,
  ) {}

  async seedRoles() {
    const query = this.dbRol.createQueryBuilder('rol');
    await query.delete().where({}).execute();

    const roles: string[] = ['god', 'admin', 'docente', 'estudiante'];

    let i = 1;
    for (let rol of roles) {
      const rolDto: CreateRolDto = { nombre: rol, id: i++ };
      await this.userService.createRoles(rolDto);
    }

    return `seed de roles completado`;
  }
}
