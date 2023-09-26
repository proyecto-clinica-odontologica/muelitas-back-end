import { IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateRolDto {
  @IsNumber()
  @Min(1)
  @Max(4)
  id: number;

  @IsString()
  @MinLength(3)
  nombre: string;
}
