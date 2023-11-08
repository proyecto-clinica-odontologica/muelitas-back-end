import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateManifestacionEndodonciaDto {
  @IsInt({ message: 'El id de la endodoncia debe ser un entero' })
  @IsNotEmpty({ message: 'El id de la endodoncia es requerido' })
  EndodonciaId: number;

  @IsInt({ message: 'El id de la manifestacion del dolor debe ser un entero' })
  @IsNotEmpty({ message: 'El id de la manifestacion del dolor es requerido' })
  ManifestacionDolorId: number;
}
