import { PartialType } from '@nestjs/mapped-types';
import { CreateIntegranteDto } from './create-integrante.dto';

export class UpdateIntegranteDto extends PartialType(CreateIntegranteDto) {}
