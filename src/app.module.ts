import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoiValidationSchema } from './config/joi.config';
import { AuthModule } from './auth/auth.module';
import { CarasdientesModule } from './carasdientes/carasdientes.module';
import { MapeoModule } from './mapeo/mapeo.module';
import { CarasdientesModule } from './carasdientes/carasdientes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    CarasdientesModule,
    MapeoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
