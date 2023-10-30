import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamenIntrabucal } from './entity/examen-intrabucal.entity';
import { CreateExamenIntrabucalDto } from './dto/create-examen-intrabucal.dto';
import { UpdateExamenIntrabucalDto } from './dto/update-examen-intrabucal.dto';

@Injectable()
export class ExamenIntrabucalService {

    constructor(@InjectRepository(ExamenIntrabucal) private examenIntrabucalRepository:  Repository<ExamenIntrabucal>){}

    // Crear Dientes
    async createExamenIntrabucal(examenintrabucal: CreateExamenIntrabucalDto){

        const nuevoExamenintrabucal = this.examenIntrabucalRepository.create(examenintrabucal);
        return this.examenIntrabucalRepository.save(nuevoExamenintrabucal);
    }

    getExamenIntrabucals(){
        return this.examenIntrabucalRepository.find()       // Busca todos los datos que contiene la tabla Usuarios
    }

    async getExamenIntrabucal(idExamenIntrabucal: number){
        const examenIntrabucalExiste = await this.examenIntrabucalRepository.findOne({        // Busca un solo objeto, en este caso estoy buscando por el id
            where: { idExamenIntrabucal }
        })

        if (!examenIntrabucalExiste){
            return new HttpException('Examen Intrabucal no Existe', 
            HttpStatus.NOT_FOUND);
        }
        return examenIntrabucalExiste;
    }

    async deleteExamenIntrabucal(idExamenIntrabucal:number){

        const result = await this.examenIntrabucalRepository.delete({idExamenIntrabucal});
        if(result.affected === 0){
            return new HttpException('Examen Intrabucal no Existe', HttpStatus.NOT_FOUND);
        }

        return result
    }

    async updateExamenIntrabucal(idExamenIntrabucal: number, examenintrabucal:UpdateExamenIntrabucalDto){
        const examenIntrabucalExiste = await this.examenIntrabucalRepository.findOne({        // Busca un solo objeto, en este caso estoy buscando por el id
            where: { idExamenIntrabucal }
        })

        if (!examenIntrabucalExiste){
            return new HttpException('Examen Intrabucal no Existe', 
            HttpStatus.NOT_FOUND);
        }

        const updateExamenIntrabucal = Object.assign(examenIntrabucalExiste, examenintrabucal);
        return this.examenIntrabucalRepository.save(updateExamenIntrabucal);

    }
}
