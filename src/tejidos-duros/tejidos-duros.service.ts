import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TejidoDuro } from './entity/tejido-duro.entity';
import { Repository } from 'typeorm';
import { CreateTejidosDurosDto } from './dto/create-tejidos-duros.dto';
import { UpdateTejidosDurosDto } from './dto/update-tejidos-duros.dto';

@Injectable()
export class TejidosDurosService {

    constructor(@InjectRepository(TejidoDuro) private tejidosDurosRepository: Repository<TejidoDuro>){}

    async createTejidoDuro(tejidoduro: CreateTejidosDurosDto){

        const nuevoTejidoDuro = this.tejidosDurosRepository.create(tejidoduro);
        return this.tejidosDurosRepository.save(nuevoTejidoDuro)
    }

    getTejidosDuros(){
        return this.tejidosDurosRepository.find()
    }

    async getTejidoDuro(idTejidoDuro: number){
        const tejidoDuroExiste = await this.tejidosDurosRepository.findOne({
            where: {idTejidoDuro}
        })

        if(!tejidoDuroExiste){
            return new HttpException('Tejidos Duros no Existe',
            HttpStatus.NOT_FOUND);
        }
        return tejidoDuroExiste;
    }

    async deleteTejidoDuro(idTejidoDuro:number){

        const result = await this.tejidosDurosRepository.delete({idTejidoDuro});
        if(result.affected === 0){
            return new HttpException('Tejidos Duros no Existe', HttpStatus.NOT_FOUND);
        }
        return result
    }

    async updateTejidoDuro(idTejidoDuro: number, tejidoduro:UpdateTejidosDurosDto){
        const tejidoDuroExiste = await this.tejidosDurosRepository.findOne({        // Busca un solo objeto, en este caso estoy buscando por el id
            where: { idTejidoDuro }
        })

        if (!tejidoDuroExiste){
            return new HttpException('Tejidos Duros no Existe', 
            HttpStatus.NOT_FOUND);
        }

        const updateTejidoDuro = Object.assign(tejidoDuroExiste, tejidoduro);
        return this.tejidosDurosRepository.save(updateTejidoDuro);

    }

}
