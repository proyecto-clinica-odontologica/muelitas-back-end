import { PartialType } from '@nestjs/mapped-types';
import { CreateCarasdienteDto } from './create-carasdiente.dto';

export class UpdateCarasdienteDto extends PartialType(CreateCarasdienteDto) {}
