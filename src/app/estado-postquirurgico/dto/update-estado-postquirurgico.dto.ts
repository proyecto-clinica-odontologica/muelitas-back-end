import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoPostquirurgicoDto } from './create-estado-postquirurgico.dto';

export class UpdateEstadoPostquirurgicoDto extends PartialType(CreateEstadoPostquirurgicoDto) {}
