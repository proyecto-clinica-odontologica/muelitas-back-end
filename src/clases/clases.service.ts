import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from 'src/cursos/entities/curso.entity';
import { Docente } from 'src/docentes/entities/docente.entity';
import { Periodo } from 'src/periodos/entities/periodo.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { Clase } from './entities/clase.entity';

@Injectable()
export class ClasesService {
  constructor(
    @InjectRepository(Clase)
    private readonly dbClase: Repository<Clase>,

    @InjectRepository(Docente)
    private readonly dbDocente: Repository<Docente>,

    @InjectRepository(Periodo)
    private readonly dbPeriodo: Repository<Periodo>,

    @InjectRepository(Curso)
    private readonly dbCurso: Repository<Curso>,

    private readonly dataSource: DataSource,
  ) {}

  async registrarClase(createClaseDto: CreateClaseDto) {
    try {
      const curso = await this.dbCurso.findOne({
        where: { id: createClaseDto.idCurso },
      });
      const docente = await this.dbDocente.findOne({
        where: { id: createClaseDto.idDocente },
      });
      const periodo = await this.dbPeriodo.findOne({
        where: { id: createClaseDto.idPeriodo },
      });

      if (!curso || !docente || !periodo) {
        throw new NotFoundException('Curso, Docente o Periodo no encontrado');
      }

      const clase = this.dbClase.create({
        ...createClaseDto,
        docente: docente,
        curso: curso,
        periodo: periodo,
      });

      return await this.dbClase.save(clase);
    } catch (error) {
      throw error;
    }
  }

  async obtenerClases() {
    try {
      return this.dbClase.find();
    } catch (error) {
      throw error;
    }
  }

  async BuscarUnaClase(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async BuscarClasePorPeriodo(nombrePeriodo: string) {
    try {
      const clases = await this.dbPeriodo
        .createQueryBuilder('periodo')
        .innerJoinAndSelect(
          'periodo.clase',
          'clase',
          'clase.periodoId = periodo.id',
        )
        .leftJoinAndSelect('clase.curso', 'curso')
        .where('periodo.Nombre = :nombrePeriodo', { nombrePeriodo })
        .select([
          'clase.id',
          'clase.Nombre',
          'clase.Salon',
          'clase.Horario',
          'curso.id',
          'curso.Nombre',
          'periodo.Nombre',
          'periodo.FechaInicio',
          'periodo.FechaFin',
        ])
        .getMany();

      if (!clases.length) {
        throw new NotFoundException('No existe clases para ese periodo');
      }

      return clases;
    } catch (error) {
      throw error;
    }
  }

  async BuscarClasePorPeriodoDocente(
    nombreDocente: string,
    nombrePeriodo: string,
  ) {
    try {
      const clases = await this.dbClase
        .createQueryBuilder('clase')
        .innerJoinAndSelect('clase.docente', 'docente')
        .innerJoinAndSelect('clase.periodo', 'periodo')
        .innerJoinAndSelect('clase.curso', 'curso')
        .where('docente.NombreCompleto = :nombreDocente', { nombreDocente })
        .andWhere('periodo.Nombre = :nombrePeriodo', { nombrePeriodo })
        .select([
          'clase.id',
          'clase.Nombre',
          'clase.Salon',
          'clase.Horario',
          'curso.id',
          'curso.Nombre',
          'periodo.Nombre',
          'periodo.FechaInicio',
          'periodo.FechaFin',
        ])
        .getMany();

      if (!clases.length) {
        throw new NotFoundException(
          'No existe clases para ese periodo con este docente',
        );
      }

      return clases;
    } catch (error) {
      throw error;
    }
  }

  async BuscarClasePorPeriodoDocenteCurso(
    nombreDocente: string,
    nombrePeriodo: string,
    nombreCurso: string,
  ) {
    try {
      const clases = await this.dbClase
        .createQueryBuilder('clase')
        .innerJoinAndSelect('clase.docente', 'docente')
        .innerJoinAndSelect('clase.periodo', 'periodo')
        .innerJoinAndSelect('clase.curso', 'curso')
        .where('docente.NombreCompleto = :nombreDocente', { nombreDocente })
        .andWhere('periodo.Nombre = :nombrePeriodo', { nombrePeriodo })
        .andWhere('curso.Nombre = :nombreCurso', { nombreCurso })
        .select([
          'clase.id',
          'clase.Nombre',
          'clase.Salon',
          'clase.Horario',
          'curso.id',
          'curso.Nombre',
          'periodo.Nombre',
          'periodo.FechaInicio',
          'periodo.FechaFin',
          'docente.NombreCompleto'
        ])
        .getMany();

      if (!clases.length) {
        throw new NotFoundException(
          'No existe clases para ese periodo con este docente y curso',
        );
      }

      return clases;
    } catch (error) {
      throw error;
    }
  }

  async actualizarClase(id: number, updateClaseDto: UpdateClaseDto) {
    try {
      const clase = await this.dbClase.preload({
        id,
        ...updateClaseDto,
      });
      if (!clase) {
        throw new NotFoundException('Clase no existe');
      }
      return await this.dbClase.save(clase);
    } catch (error) {
      throw error;
    }
  }

  async eliminarClase(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const clase = await this.dbClase.findOne({
        where: { id },
        relations: ['docente', 'curso', 'periodo'],
      });

      if (!clase || !clase.docente || !clase.curso || !clase.periodo) {
        throw new NotFoundException(
          'no existe clase o docente, o curso o periodo para esa clase',
        );
      }

      clase.activo = false;
      clase.curso.activo = false;
      clase.docente.activo = false;
      clase.periodo.activo = false;

      await queryRunner.manager.save([
        clase,
        clase.curso,
        clase.docente,
        clase.periodo,
      ]);
      await queryRunner.manager.softDelete(Clase, id);
      await queryRunner.manager.softDelete(Curso, clase.curso.id);
      await queryRunner.manager.softDelete(Docente, clase.docente.id);
      await queryRunner.manager.softDelete(Periodo, clase.periodo.id);
      await queryRunner.commitTransaction();

      return { mensaje: `La Clase con el id ${id} fue eliminada` };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async restaurarClase(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const clase = await this.dbClase.findOne({
        where: { id },
        withDeleted: true,
        relations: ['docente', 'curso', 'periodo'],
      });

      if (!clase || !clase.docente || !clase.curso || !clase.periodo) {
        throw new NotFoundException(
          'no existe clase o docente, o curso o periodo para esa clase',
        );
      }

      clase.activo = true;
      clase.curso.activo = true;
      clase.docente.activo = true;
      clase.periodo.activo = true;

      clase.deletedAt = null;
      clase.curso.deletedAt = null;
      clase.docente.deletedAt = null;
      clase.periodo.deletedAt = null;

      await queryRunner.manager.save([
        clase,
        clase.curso,
        clase.docente,
        clase.periodo,
      ]);
      await queryRunner.commitTransaction();

      return { mensaje: `La Clase con el id ${id} fue restaurada` };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
