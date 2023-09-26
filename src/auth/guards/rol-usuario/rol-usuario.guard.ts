import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES } from 'src/auth/decorators/roles-protegidos.decorator';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class RolUsuarioGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.reflector.get(ROLES, context.getHandler());

    if (!roles) {
      return true;
    }

    if (roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    if (roles.includes(user.rol?.nombre)) {
      return true;
    }

    throw new ForbiddenException(
      `El usuario ${user?.nombre} necesita un rol valido: [${roles}]`,
    );
  }
}
