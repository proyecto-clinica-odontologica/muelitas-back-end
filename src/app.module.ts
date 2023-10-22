import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { HistoriaClinicaModule } from './HistoriaClinica/historia-clinica.module';
import { AdministradorModule } from './administrador/administrador.module';
import { AuthModule } from './auth/auth.module';
import { CarasdientesModule } from './carasdientes/carasdientes.module';
import { CitaModule } from './cita/cita.module';
import { ClasesModule } from './clases/clases.module';
import { JoiValidationSchema } from './config/joi.config';
import { CursosModule } from './cursos/cursos.module';
import { DocentesModule } from './docentes/docentes.module';
import { EmpresasModule } from './empresas/empresas.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { IntegrantesModule } from './integrantes/integrantes.module';
import { MapeoModule } from './mapeo/mapeo.module';
import { OdontogramaModule } from './odontograma/odontograma.module';
import { PacienteModule } from './paciente/paciente.module';
import { PeriodosModule } from './periodos/periodos.module';
import { SedesModule } from './sedes/sedes.module';
import { SeedModule } from './seed/seed.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { TratamientoModule } from './tratamiento/tratamiento.module';
import { UsersModule } from './users/users.module';
import { SubcasoclinicoModule } from './subcasoclinico/subcasoclinico.module';
import { CasosclinicosModule } from './casosclinicos/casosclinicos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'proyecto-front'),
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
      // logging: true,
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
    PacienteModule,
    ClasesModule,
    CursosModule,
    IntegrantesModule,
    CitaModule,
    SeguimientoModule,
    TratamientoModule,
    HistoriaClinicaModule,
    OdontogramaModule,
    MapeoModule,
    CarasdientesModule,
    SubcasoclinicoModule,
    CasosclinicosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}