import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AdministradorModule } from './administrador/administrador.module';
import { AuthModule } from './auth/auth.module';
import { ClasesModule } from './clases/clases.module';
import { JoiValidationSchema } from './config/joi.config';
import { CursosModule } from './cursos/cursos.module';
import { DocentesModule } from './docentes/docentes.module';
import { EmpresasModule } from './empresas/empresas.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { IntegrantesModule } from './integrantes/integrantes.module';
import { PeriodosModule } from './periodos/periodos.module';
import { SedesModule } from './sedes/sedes.module';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './users/users.module';
import { PacienteModule } from './paciente/paciente.module';
import { OdontogramaModule } from './odontograma/odontograma.module';
import { ExamenEstomatologicoModule } from './examen-estomatologico/examen-estomatologico.module';
import { InterpretacionModule } from './interpretacion/interpretacion.module';
import { EpicrisisModule } from './epicrisis/epicrisis.module';
import { NotasEvolutivasModule } from './notas-evolutivas/notas-evolutivas.module';
import { PlanyCronogramaTratamientoModule } from './plany-cronograma-tratamiento/plany-cronograma-tratamiento.module';

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
    OdontogramaModule,
    ExamenEstomatologicoModule,
    InterpretacionModule,
    EpicrisisModule,
    NotasEvolutivasModule,
    PlanyCronogramaTratamientoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
