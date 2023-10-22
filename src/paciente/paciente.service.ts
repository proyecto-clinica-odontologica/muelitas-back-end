import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente} from './entities/paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private dbPaciente: Repository<Paciente>,
  ) {}
  async create(createPacienteDto: CreatePacienteDto) {
    createPacienteDto.Nombre = createPacienteDto.Nombre.toLowerCase();
    createPacienteDto.ApellidoPaterno = createPacienteDto.ApellidoPaterno.toLowerCase();
    createPacienteDto.ApellidoMaterno = createPacienteDto.ApellidoMaterno.toLowerCase();
    createPacienteDto.FechaNacimiento = createPacienteDto.FechaNacimiento.toLowerCase();
    createPacienteDto.Genero = createPacienteDto.Genero.toLowerCase();
    createPacienteDto.Celular = createPacienteDto.Celular.toLowerCase();
    createPacienteDto.Edad = createPacienteDto.Edad;
    createPacienteDto.Correo = createPacienteDto.Correo.toLowerCase();
    createPacienteDto.TipoDoc = createPacienteDto.TipoDoc.toLowerCase();
    createPacienteDto.NumeroDocumento = createPacienteDto.NumeroDocumento.toLowerCase();
    createPacienteDto.EstadoCivil = createPacienteDto.EstadoCivil.toLowerCase();
    createPacienteDto.Ocupacion = createPacienteDto.Ocupacion.toLowerCase();
    createPacienteDto.EstadoCivil = createPacienteDto.EstadoCivil.toLowerCase();
    createPacienteDto.GradoDeInstruccion = createPacienteDto.GradoDeInstruccion.toLowerCase();
    createPacienteDto.Domicilio = createPacienteDto.Domicilio.toLowerCase();
    createPacienteDto.Acompaniante = createPacienteDto.Acompaniante.toLowerCase();
    createPacienteDto.AntecedentePatologico = createPacienteDto.AntecedentePatologico.toLowerCase();
    createPacienteDto.AntecedentePersonal = createPacienteDto.AntecedentePersonal.toLowerCase();
    createPacienteDto.AntecedenteFamiliar = createPacienteDto.AntecedenteFamiliar.toLowerCase();
    createPacienteDto.Parentesco = createPacienteDto.Parentesco.toLowerCase();
    createPacienteDto.Peso = createPacienteDto.Peso;
    createPacienteDto.Talla= createPacienteDto.Talla;
    createPacienteDto.IMC = createPacienteDto.IMC;
    createPacienteDto.Alergias = createPacienteDto.Alergias.toLowerCase();
    createPacienteDto.Piel = createPacienteDto.Piel.toLowerCase();
    createPacienteDto.Unias = createPacienteDto.Unias.toLowerCase();
    createPacienteDto.Cabello = createPacienteDto.Cabello.toLowerCase();

    
    try {
      const Paciente = this.dbPaciente.create(createPacienteDto);
      await this.dbPaciente.save(Paciente);
      return Paciente;
    } catch (error) {
      throw error;
    }
  }
  //
  async findAll() {
    try {
      return await this.dbPaciente.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    let Paciente: Paciente;
    try {
      if (isNaN(+id)) {
        Paciente = await this.dbPaciente.findOneBy({ Nombre: id });
      }else if(isNaN(+id)) {
        Paciente = await this.dbPaciente.findOneBy({ ApellidoPaterno: id });
      } else if(isNaN(+id)) {
        Paciente = await this.dbPaciente.findOneBy({ ApellidoMaterno: id });
      } else if(isNaN(+id)) {
        Paciente = await this.dbPaciente.findOneBy({ NumeroDocumento: id });
      } else {
        Paciente = await this.dbPaciente.findOneBy({ idPaciente: +id });
      }

      if (!Paciente) {
        throw new NotFoundException(
          `no existe un paciente con el id ${id} en la base de datos`,
        );
      }

      return Paciente;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    updatePacienteDto.Nombre = updatePacienteDto.Nombre.toLowerCase();
    updatePacienteDto.ApellidoPaterno = updatePacienteDto.ApellidoPaterno.toLowerCase();
    updatePacienteDto.ApellidoMaterno = updatePacienteDto.ApellidoMaterno.toLowerCase();
    updatePacienteDto.FechaNacimiento = updatePacienteDto.FechaNacimiento.toLowerCase();
    updatePacienteDto.Genero = updatePacienteDto.Genero.toLowerCase();
    updatePacienteDto.Celular = updatePacienteDto.Celular.toLowerCase();
    updatePacienteDto.Edad = updatePacienteDto.Edad;
    updatePacienteDto.Correo = updatePacienteDto.Correo.toLowerCase();
    updatePacienteDto.TipoDoc = updatePacienteDto.TipoDoc.toLowerCase();
    updatePacienteDto.NumeroDocumento = updatePacienteDto.NumeroDocumento.toLowerCase();
    updatePacienteDto.EstadoCivil = updatePacienteDto.EstadoCivil.toLowerCase();
    updatePacienteDto.Ocupacion = updatePacienteDto.Ocupacion.toLowerCase();
    updatePacienteDto.EstadoCivil = updatePacienteDto.EstadoCivil.toLowerCase();
    updatePacienteDto.GradoDeInstruccion = updatePacienteDto.GradoDeInstruccion?.toLowerCase();
    updatePacienteDto.Domicilio = updatePacienteDto.Domicilio.toLowerCase();
    updatePacienteDto.Acompaniante = updatePacienteDto.Acompaniante?.toLowerCase();
    updatePacienteDto.AntecedentePatologico = updatePacienteDto.AntecedentePatologico?.toLowerCase();
    updatePacienteDto.AntecedentePersonal = updatePacienteDto.AntecedentePersonal?.toLowerCase();
    updatePacienteDto.AntecedenteFamiliar = updatePacienteDto.AntecedenteFamiliar?.toLowerCase();
    updatePacienteDto.Parentesco = updatePacienteDto.Parentesco?.toLowerCase();
    updatePacienteDto.Peso = updatePacienteDto.Peso;
    updatePacienteDto.Talla= updatePacienteDto.Talla;
    updatePacienteDto.IMC = updatePacienteDto.IMC;
    updatePacienteDto.Alergias = updatePacienteDto.Alergias.toLowerCase();
    updatePacienteDto.Piel = updatePacienteDto.Piel?.toLowerCase();
    updatePacienteDto.Unias = updatePacienteDto.Unias?.toLowerCase();
    updatePacienteDto.Cabello = updatePacienteDto.Cabello?.toLowerCase();

    try {
      const Paciente = await this.dbPaciente.preload({
        idPaciente: id,
        ...updatePacienteDto,
      });
      await this.dbPaciente.save(Paciente);
      return Paciente;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const Paciente = await this.findOne(id);
      await this.dbPaciente.remove(Paciente);
      return {
        message: `Paciente con el id ${id} fue eliminado`,
      };
    } catch (error) {
      throw error;
    }
  }
}
