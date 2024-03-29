import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Curso } from '../cursos/entities/curso.entity';
import { Docente } from '../docentes/entities/docente.entity';
import { Periodo } from '../periodos/entities/periodo.entity';
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
      if (error.errno === 1062) {
        throw new BadRequestException('El registro ya existe en la base de datos');
      }
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

  async buscarClasePorId(id: number) {
    try {
      const clase = await this.dbClase.findOne({
        where: { id },
        relations: ['docente', 'curso', 'periodo'],
        select: ['id', 'Nombre', 'Salon', 'Horario'],
        join: {
          alias: 'clase',
          leftJoinAndSelect: {
            docente: 'clase.docente',
            curso: 'clase.curso',
            periodo: 'clase.periodo',
          },
        },
      });

      if (!clase) {
        throw new NotFoundException('Clase no existe');
      }

      if (clase.docente) {
        delete clase.docente.id;
        delete clase.docente.activo;
        delete clase.docente.deletedAt;
        delete clase.docente.usuario;
      }

      if (clase.curso) {
        delete clase.curso.id;
        delete clase.curso.activo;
        delete clase.curso.deletedAt;
      }

      if (clase.periodo) {
        delete clase.periodo.id;
        delete clase.periodo.activo;
        delete clase.periodo.deletedAt;
      }

      if (clase.periodo.sede) {
        delete clase.periodo.sede.id;
        delete clase.periodo.sede.activo;
        delete clase.periodo.sede.deletedAt;
      }

      return clase;
    } catch (error) {
      throw error;
    }
  }

  async buscarClasePorNombre(nombreClase: string) {
    try {
      const clase = await this.dbClase.findOne({
        where: { Nombre: nombreClase },
        relations: ['docente', 'curso', 'periodo'],
        select: ['id', 'Nombre', 'Salon', 'Horario'],
        join: {
          alias: 'clase',
          leftJoinAndSelect: {
            docente: 'clase.docente',
            curso: 'clase.curso',
            periodo: 'clase.periodo',
          },
        },
      });

      if (!clase) {
        throw new NotFoundException('Clase no existe');
      }

      if (clase.docente) {
        delete clase.docente.id;
        delete clase.docente.activo;
        delete clase.docente.deletedAt;
        delete clase.docente.usuario;
      }

      if (clase.curso) {
        delete clase.curso.id;
        delete clase.curso.activo;
        delete clase.curso.deletedAt;
      }

      if (clase.periodo) {
        delete clase.periodo.id;
        delete clase.periodo.activo;
        delete clase.periodo.deletedAt;
      }

      if (clase.periodo.sede) {
        delete clase.periodo.sede.id;
        delete clase.periodo.sede.activo;
        delete clase.periodo.sede.deletedAt;
      }

      return clase;
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
        throw new NotFoundException('no existe clase o docente, o curso o periodo para esa clase');
      }

      clase.activo = false;
      clase.curso.activo = false;
      clase.docente.activo = false;
      clase.periodo.activo = false;

      await queryRunner.manager.save([clase, clase.curso, clase.docente, clase.periodo]);
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
        throw new NotFoundException('no existe clase o docente, o curso o periodo para esa clase');
      }

      clase.activo = true;
      clase.curso.activo = true;
      clase.docente.activo = true;
      clase.periodo.activo = true;

      clase.deletedAt = null;
      clase.curso.deletedAt = null;
      clase.docente.deletedAt = null;
      clase.periodo.deletedAt = null;

      await queryRunner.manager.save([clase, clase.curso, clase.docente, clase.periodo]);
      await queryRunner.commitTransaction();

      return { mensaje: `La Clase con el id ${id} fue restaurada` };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  // !DESDE ACA
  async obtenerClasesPorPeriodo(idPeriodo: number) {
    try {
      const clase = await this.dbClase.find({
        where: { periodo: { id: idPeriodo } },
      });

      if (!clase) {
        throw new NotFoundException('No existe clases para este periodo');
      }

      return clase;
    } catch (error) {
      throw error;
    }
  }

  async obtenerClasesPorPeriodoDocente(idDocente: number, idPeriodo: number) {
    try {
      const clase = await this.dbClase.find({
        where: {
          docente: { id: idDocente },
          periodo: {
            id: idPeriodo,
            sede: {
              usuario: {
                Rol: 'docente',
              },
            },
          },
        },
        relations: ['curso', 'periodo', 'docente'],
      });

      if (!clase.length) {
        throw new NotFoundException('No existe clases para este periodo y docente');
      }

      return clase;
    } catch (error) {
      throw error;
    }
  }

  async obtenerClasesPorPeriodoDocenteCurso(idDocente: number, idPeriodo: number, idCurso: number) {
    try {
      const clase = await this.dbClase.findOne({
        where: {
          docente: { id: idDocente },
          periodo: {
            id: idPeriodo,
            sede: {
              usuario: {
                Rol: 'docente',
              },
            },
          },
          curso: { id: idCurso },
        },
        relations: ['curso', 'periodo', 'docente'],
      });
      if (!clase) {
        throw new NotFoundException('No existe clases para este periodo, docente y curso');
      }
      return clase;
    } catch (error) {
      throw error;
    }
  }
}
