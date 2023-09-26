import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AuthModule],
})
export class SeedModule {}
