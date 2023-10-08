import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DocentesModule } from 'src/docentes/docentes.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AuthModule, DocentesModule],
})
export class SeedModule {}
