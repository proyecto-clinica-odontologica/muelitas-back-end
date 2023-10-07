import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradorModule } from './administrador/administrador.module';
import { AuthModule } from './auth/auth.module';
import { JoiValidationSchema } from './config/joi.config';
import { DocentesModule } from './docentes/docentes.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './users/users.module';
import { SedesModule } from './sedes/sedes.module';
import { PeriodosModule } from './periodos/periodos.module';
import { EmpresasModule } from './empresas/empresas.module';
import { ClasesModule } from './clases/clases.module';

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
    SeedModule,
    UsersModule,
    EstudiantesModule,
    DocentesModule,
    AdministradorModule,
    SedesModule,
    PeriodosModule,
    EmpresasModule,
    ClasesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
