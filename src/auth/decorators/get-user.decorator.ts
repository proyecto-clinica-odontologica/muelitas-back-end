import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  const user = request.user;

  if (!user) {
    throw new ForbiddenException('El usuario no existe (Request)');
  }

  if (!data) {
    return user;
  }

  return user[data];
});
