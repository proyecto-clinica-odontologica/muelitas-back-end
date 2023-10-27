import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SedesModule } from '../sedes/sedes.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AuthModule, SedesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
