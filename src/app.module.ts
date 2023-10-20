import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoiValidationSchema } from './config/joi.config';
import { AuthModule } from './auth/auth.module';
import { CitaModule } from './cita/cita.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { TratamientoModule } from './tratamiento/tratamiento.module';

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
    CitaModule,
    SeguimientoModule,
    TratamientoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
