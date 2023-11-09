import { PartialType } from '@nestjs/mapped-types';
import { CreateTecnicaRadiograficaDto } from './create-tecnica-radiografica.dto';

export class UpdateTecnicaRadiograficaDto extends PartialType(CreateTecnicaRadiograficaDto) {}
