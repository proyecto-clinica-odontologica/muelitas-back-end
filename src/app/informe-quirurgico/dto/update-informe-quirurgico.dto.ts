import { PartialType } from '@nestjs/mapped-types';
import { CreateInformeQuirurgicoDto } from './create-informe-quirurgico.dto';

export class UpdateInformeQuirurgicoDto extends PartialType(CreateInformeQuirurgicoDto) {}
