import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInfQuirurgicoDto } from './dto/create-infquirurgico.dto';
import { UpdateInfQuirurgicoDto } from './dto/update-infquirurgico.dto';
import { InjectRepository } from '@nestjs/typeorm';
//import { Cirugia } from '../cirugia/entities/cirugia.entity';
import { Repository } from 'typeorm';
import { InfQuirurgico } from './entities/infquirurgico.entity';

@Injectable()
export class InformequirurgicoService {
    constructor(
    @InjectRepository(InfQuirurgico) 
    private infQuirurgicoRepository: Repository<InfQuirurgico>
    //,
    //@InjectRepository(Cirugia) 
    //private readonly cirugiaRepository: Repository<Cirugia>
    ){}

  async createInfQuirurgico(infQuirurgicoDto: CreateInfQuirurgicoDto){
    try {
      //const cirugia = await this.cirugiaRepository.findOne({
      //  where: { id: infQuirurgicoDto.cirugia },
      //});
      //if (!cirugia) {
      //  throw new NotFoundException('Cirugia no encontrado en la base de datos');
      //}
      const infQuirurgico = this.infQuirurgicoRepository.create({
        ...infQuirurgicoDto
        //,
        //cirugia,
      });
      return await this.infQuirurgicoRepository.save(infQuirurgico);
    } catch (error) {
      throw error;
    }
  }
  getListInfQuirurgico(){
    return this.infQuirurgicoRepository.find()
  }
  async getInfQuirurgico(id: number){
    const infQuirurgicoFound = await this.infQuirurgicoRepository.findOne({
      where: {
        id
      }
    })
    if(!infQuirurgicoFound){
        return new HttpException('Informe quirurgico no encontrado', HttpStatus.NOT_FOUND)
    }
    return infQuirurgicoFound
  }

  async deleteInfQuirurgico(id: number){
    const result = await this.infQuirurgicoRepository.delete({ id })
     if(result.affected === 0){
        return new HttpException('Informe quirurgico no encontrado', HttpStatus.NOT_FOUND)
    }
    return result
  }

  async updateInfQuirurgico(id: number, infQuirurgicoDto: UpdateInfQuirurgicoDto){
    try {
      const infQuirurgico = await this.infQuirurgicoRepository.findOne({
        where: { id }
      });
    
      if (!infQuirurgico) {
        throw new NotFoundException('Informe quirurgico no encontrada en la base de datos');
      }

      //const cirugia = await this.cirugiaRepository.findOne({
      //  where: { id: infQuirurgicoDto.Idcirugia },
      //});

      //if (!cirugia) {
      //  throw new NotFoundException('Cirugia no encontrada en la base de datos');
      //}
      infQuirurgico.Nombre = infQuirurgicoDto.Nombre;
      infQuirurgico.Detalle = infQuirurgicoDto.Detalle;
      //if (infQuirurgicoDto.Idcirugia) {
      //  infQuirurgicoDto.Idcirugia = cirugia;
      //}
      
      await this.infQuirurgicoRepository.save(infQuirurgico);
      return infQuirurgico;
    } catch (error) {
      throw error;
    }
  }
  async getInfQuirurgicoByCirugia(id: number) {
      try {
        //const cirugia = await this.cirugiaRepository.findOne({
        //  where: { id },
        //});
  
        //if (!cirugia) {
        //  throw new NotFoundException('Cirugia no encontrado en la base de datos');
        //}
        //const infQuirurgico = await this.infQuirurgicoRepository.findOne({
        //  where: {
        //    cirugia: {
        //      id,
        //    },
        //  },
        //});
  
        //if (!infQuirurgico) {
        //  throw new NotFoundException('Interpretacion radiografica no encontrada en la base de datos');
        //}
        //return infQuirurgico;
      } catch (error) {
        throw error;
      }
    }
}
