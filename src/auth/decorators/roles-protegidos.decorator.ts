import { SetMetadata } from '@nestjs/common';
import { TipoRol } from 'src/auth/interfaces/enum-roles.interface';

export const ROLES = 'roles';

export const RolesProtegidos = (...args: TipoRol[]) => {
  return SetMetadata(ROLES, args);
};
