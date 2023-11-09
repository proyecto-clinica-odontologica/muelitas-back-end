import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JoiValidationSchema } from '../config/joi.config';
import { HistoriaClinicaModule } from './HistoriaClinica/historia-clinica.module';
import { AdministradorModule } from './administrador/administrador.module';
import { AnamnesisModule } from './anamnesis/anamnesis.module';
import { AuthModule } from './auth/auth.module';
import { CarasdientesModule } from './carasdientes/carasdientes.module';
import { CasosclinicosModule } from './casosclinicos/casosclinicos.module';
import { CirugiaModule } from './cirugia/cirugia.module';
import { CitaModule } from './cita/cita.module';
import { ClasesModule } from './clases/clases.module';
import { ConductometriaModule } from './conductometria/conductometria.module';
import { CursosModule } from './cursos/cursos.module';
import { DiagnosticoDefinitivoModule } from './diagnostico-definitivo/diagnostico-definitivo.module';
import { DiagnosticoPresuntivoModule } from './diagnostico-presuntivo/diagnostico-presuntivo.module';
import { DocentesModule } from './docentes/docentes.module';
import { EmpresasModule } from './empresas/empresas.module';
import { EndodonciaModule } from './endodoncia/endodoncia.module';
import { EpicrisisModule } from './epicrisis/epicrisis.module';
import { EstadoPostquirurgicoModule } from './estado-postquirurgico/estado-postquirurgico.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { ExamenAuxiliarModule } from './examen-auxiliar/examen-auxiliar.module';
import { ExamenEstomatologicoModule } from './examen-estomatologico/examen-estomatologico.module';
import { ExamenGeneralModule } from './examen-general/examen-general.module';
import { FilesModule } from './files/files.module';
import { InformeQuirurgicoModule } from './informe-quirurgico/informe-quirurgico.module';
import { IntegrantesModule } from './integrantes/integrantes.module';
import { InterpretacionRadiograficaModule } from './interpretacion-radiografica/interpretacion-radiografica.module';
import { InterpretacionModule } from './interpretacion/interpretacion.module';
import { ManifestacionDolorModule } from './manifestacion-dolor/manifestacion-dolor.module';
import { ManifestacionEndodonciaModule } from './manifestacion-endodoncia/manifestacion-endodoncia.module';
import { MapeoModule } from './mapeo/mapeo.module';
import { NotaEvolutivaModule } from './nota-evolutiva/nota-evolutiva.module';
import { OdontogramaModule } from './odontograma/odontograma.module';
import { OperatoriaModule } from './operatoria/operatoria.module';
import { OpturacionConductosModule } from './opturacion-conductos/opturacion-conductos.module';
import { PacienteModule } from './paciente/paciente.module';
import { PeriodosModule } from './periodos/periodos.module';
import { PlanTratamientoModule } from './plan-tratamiento/plan-tratamiento.module';
import { PlanycronogramaTratamientoModule } from './planycronograma-tratamiento/planycronograma-tratamiento.module';
import { PreparacionQuimicaModule } from './preparacion-quimica/preparacion-quimica.module';
import { PruebaOperatoriaModule } from './prueba-operatoria/prueba-operatoria.module';
import { PruebaModule } from './prueba/prueba.module';
import { RadiografiaCirugiaModule } from './radiografia-cirugia/radiografia-cirugia.module';
import { RadiografiaEndodonciaModule } from './radiografia-endodoncia/radiografia-endodoncia.module';
import { SedesModule } from './sedes/sedes.module';
import { SeedModule } from './seed/seed.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { SubcasoclinicoModule } from './subcasoclinico/subcasoclinico.module';
import { TratamientoModule } from './tratamiento/tratamiento.module';
import { UsersModule } from './users/users.module';
import { TecnicaRadiograficaModule } from './tecnica-radiografica/tecnica-radiografica.module';
import { PlanTrabajoModule } from './plan-trabajo/plan-trabajo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public', 'proyecto-front'),
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
    CitaModule,
    SeguimientoModule,
    TratamientoModule,
    HistoriaClinicaModule,
    OdontogramaModule,
    MapeoModule,
    CarasdientesModule,
    SubcasoclinicoModule,
    CasosclinicosModule,
    ExamenGeneralModule,
    DiagnosticoPresuntivoModule,
    ExamenAuxiliarModule,
    AnamnesisModule,
    DiagnosticoDefinitivoModule,
    PlanycronogramaTratamientoModule,
    ExamenEstomatologicoModule,
    NotaEvolutivaModule,
    EpicrisisModule,
    InterpretacionModule,
    FilesModule,
    EndodonciaModule,
    OpturacionConductosModule,
    RadiografiaEndodonciaModule,
    PreparacionQuimicaModule,
    ConductometriaModule,
    ManifestacionDolorModule,
    ManifestacionEndodonciaModule,
    CirugiaModule,
    EstadoPostquirurgicoModule,
    PlanTratamientoModule,
    InformeQuirurgicoModule,
    InterpretacionRadiograficaModule,
    RadiografiaCirugiaModule,
    OperatoriaModule,
    PruebaOperatoriaModule,
    PruebaModule,
    TecnicaRadiograficaModule,
    PlanTrabajoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
