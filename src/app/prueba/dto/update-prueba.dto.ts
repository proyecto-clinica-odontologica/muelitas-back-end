import { PartialType } from '@nestjs/mapped-types';
import { CreatePruebaDto } from './create-prueba.dto';

export class UpdatePruebaDto extends PartialType(CreatePruebaDto) {}
