import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { TipoRol } from 'src/auth/interfaces/enum-roles.interface';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(TipoRol.admin)
  seedRoles() {
    return this.seedService.seedRoles();
  }
}
