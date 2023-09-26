import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolUsuarioGuard } from '../guards/rol-usuario/rol-usuario.guard';
import { TipoRol } from '../interfaces/enum-roles.interface';
import { RolesProtegidos } from './roles-protegidos.decorator';

export function Auth(...roles: TipoRol[]) {
  return applyDecorators(
    RolesProtegidos(...roles),
    UseGuards(AuthGuard(), RolUsuarioGuard),
  );
}
