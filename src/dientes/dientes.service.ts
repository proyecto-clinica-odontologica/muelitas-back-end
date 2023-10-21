import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diente } from './diente.entity';
import { Repository } from 'typeorm';
import { CreateDienteDto } from './dto/create-diente.dto';
import { UpdateDienteDto } from './dto/update-diente.dto';

@Injectable()
export class DientesService {

    // Importe la clase usuario y conviertelo en un repositorio de Typeorm, donde podemos hacer consultas.
    constructor(@InjectRepository(Diente) private dienteRepository:  Repository<Diente>){}

    // Crear Dientes
    async createDiente(diente: CreateDienteDto){

        const dienteExiste = await this.dienteRepository.findOne({   // Busca si en nuestro repositorio de Usuarios el dato 
            where:{nombre: diente.nombre}                          //  identico 
        })
        
        if(dienteExiste){       // Si el Usuario se ha encontrado, hacer...
            return new HttpException('Diente ya existe',   // Mensaje que se le envia 
            HttpStatus.CONFLICT)        // Que tipo de error estamos enviando
        }

        const nuevoDientes = this.dienteRepository.create(diente);
        return this.dienteRepository.save(nuevoDientes);
    }

    geDientes(){
        return this.dienteRepository.find()       // Busca todos los datos que contiene la tabla Usuarios
    }

    async getDiente(idDiente: number){
        const dienteExiste = await this.dienteRepository.findOne({        // Busca un solo objeto, en este caso estoy buscando por el id
            where: { idDiente }
        })

        if (!dienteExiste){
            return new HttpException('Diente no Existe', 
            HttpStatus.NOT_FOUND);
        }
        return dienteExiste;
    }

    async deleteDiente(idDiente:number){

        const result = await this.dienteRepository.delete({idDiente});
        if(result.affected === 0){
            return new HttpException('Diente no Existe', HttpStatus.NOT_FOUND);
        }

        return result
    }

    async updateDiente(idDiente: number, diente:UpdateDienteDto){
        const dienteExiste = await this.dienteRepository.findOne({        // Busca un solo objeto, en este caso estoy buscando por el id
            where: { idDiente }
        })

        if (!dienteExiste){
            return new HttpException('Diente no Existe', 
            HttpStatus.NOT_FOUND);
        }

        const updateDiente = Object.assign(dienteExiste, diente);
        return this.dienteRepository.save(updateDiente);

    }
}