import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnivelPieza } from './entity/anivel-pieza.entity';
import { Repository } from 'typeorm';
import { CreatAnivelPiezaDto } from './dto/create-anivel-pieza.dto';
import { UpdateAnivelPiezaDto } from './dto/update-anivel-pieza.dto';

@Injectable()
export class AnivelPiezaService {

    constructor(@InjectRepository(AnivelPieza) private anivelPiezaRepository: Repository<AnivelPieza>){}

    async createAnivelPieza(anivelpieza: CreatAnivelPiezaDto){

        const nuevoAnivelPieza = this.anivelPiezaRepository.create(anivelpieza);
        return this.anivelPiezaRepository.save(nuevoAnivelPieza)
    }

    getAnivelPiezas(){
        return this.anivelPiezaRepository.find()
    }

    async getAnivelPieza(idAnivelPieza: number){
        const anivelPiezaExiste = await this.anivelPiezaRepository.findOne({
            where: {idAnivelPieza}
        })

        if(!anivelPiezaExiste){
            return new HttpException('Anivel de Pieza no Existe',
            HttpStatus.NOT_FOUND);
        }
        return anivelPiezaExiste;
    }

    async deleteAnivelPieza(idAnivelPieza:number){

        const result = await this.anivelPiezaRepository.delete({idAnivelPieza});
        if(result.affected === 0){
            return new HttpException('Anivel de Pieza no Existe', HttpStatus.NOT_FOUND);
        }
        return result
    }

    async updateAnivelPieza(idAnivelPieza: number, anivelpieza:UpdateAnivelPiezaDto){
        const anivelPiezaExiste = await this.anivelPiezaRepository.findOne({        // Busca un solo objeto, en este caso estoy buscando por el id
            where: { idAnivelPieza }
        })

        if (!anivelPiezaExiste){
            return new HttpException('Anivel de Pieza no Existe', 
            HttpStatus.NOT_FOUND);
        }

        const updateAnivelPieza = Object.assign(anivelPiezaExiste, anivelpieza);
        return this.anivelPiezaRepository.save(updateAnivelPieza);

    }
}
