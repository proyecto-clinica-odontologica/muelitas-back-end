import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SedesModule } from 'src/sedes/sedes.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AuthModule, SedesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
