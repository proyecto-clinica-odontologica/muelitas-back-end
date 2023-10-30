import { PartialType } from '@nestjs/mapped-types';
import { CreatePacientedatosextraDto } from './create-pacientedatosextra.dto';

export class UpdatePacientedatosextraDto extends PartialType(CreatePacientedatosextraDto) {}
