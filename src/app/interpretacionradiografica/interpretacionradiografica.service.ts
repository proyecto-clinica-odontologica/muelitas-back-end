import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInterpRadDto } from './dto/create-interprad.dto';
import { UpdateInterpRadDto } from './dto/update-interprad.dto';
import { InjectRepository } from '@nestjs/typeorm';
//import { Cirugia } from '../cirugia/entities/cirugia.entity';
import { Repository } from 'typeorm';
import { InterpRad } from './entities/interprad.entity';

@Injectable()
export class InterpretacionradiograficaService {
    constructor(
    @InjectRepository(InterpRad) 
    private interpRadRepository: Repository<InterpRad>
    //,
    //@InjectRepository(Cirugia) 
    //private readonly cirugiaRepository: Repository<Cirugia>
    ){}

  async createInterpRad(interpRadDto: CreateInterpRadDto){
    try {
      //const cirugia = await this.cirugiaRepository.findOne({
      //  where: { id: interpRadDto.cirugia },
      //});
      //if (!cirugia) {
      //  throw new NotFoundException('Cirugia no encontrado en la base de datos');
      //}
      const interpRad = this.interpRadRepository.create({
        ...interpRadDto
        //,
        //cirugia,
      });
      return await this.interpRadRepository.save(interpRad);
    } catch (error) {
      throw error;
    }
  }
  getListInterpRad(){
    return this.interpRadRepository.find()
  }
  async getInterpRad(id: number){
    const interpRadFound = await this.interpRadRepository.findOne({
      where: {
        id
      }
    })
    if(!interpRadFound){
        return new HttpException('Interpretacion radiografica no encontrado', HttpStatus.NOT_FOUND)
    }
    return interpRadFound
  }

  async deleteInterpRad(id: number){
    const result = await this.interpRadRepository.delete({ id })
     if(result.affected === 0){
        return new HttpException('Interpretacion radiografica no encontrado', HttpStatus.NOT_FOUND)
    }
    return result
  }

  async updateInterpRad(id: number, interpRadDto: UpdateInterpRadDto){
    try {
      const interpRad = await this.interpRadRepository.findOne({
        where: { id }
      });
    
      if (!interpRad) {
        throw new NotFoundException('Interpretacion radiografica no encontrada en la base de datos');
      }

      //const cirugia = await this.cirugiaRepository.findOne({
      //  where: { id: interpRadDto.Idcirugia },
      //});

      //if (!cirugia) {
      //  throw new NotFoundException('Cirugia no encontrada en la base de datos');
      //}
      interpRad.Nombre = interpRadDto.Nombre;
      interpRad.Detalle = interpRadDto.Detalle;
      //if (interpRadDto.Idcirugia) {
      //  interpRadDto.Idcirugia = cirugia;
      //}
      
      await this.interpRadRepository.save(interpRad);
      return interpRad;
    } catch (error) {
      throw error;
    }
  }
  async getInterpRadByCirugia(id: number) {
      try {
        //const cirugia = await this.cirugiaRepository.findOne({
        //  where: { id },
        //});
  
        //if (!cirugia) {
        //  throw new NotFoundException('Cirugia no encontrado en la base de datos');
        //}
        //const interpRad = await this.interpRadRepository.findOne({
        //  where: {
        //    cirugia: {
        //      id,
        //    },
        //  },
        //});
  
        //if (!interpRad) {
        //  throw new NotFoundException('Interpretacion radiografica no encontrada en la base de datos');
        //}
        //return interpRad;
      } catch (error) {
        throw error;
      }
    }
}
