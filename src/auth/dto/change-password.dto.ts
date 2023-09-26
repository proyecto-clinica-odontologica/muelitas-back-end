import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { IsEqualToProperty } from '../decorators/validar-password.decorator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(6, {
    message: 'La contraActual (contraseña) debe tener al menos 6 caracteres',
  })
  @MaxLength(20, {
    message:
      'La contraActual (contraseña) debe tener como maximo 20 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraActual (contraseña) debe tener mayúsculas , minúsculas y un número',
  })
  contraActual: string;

  @IsString()
  @MinLength(6, {
    message: 'La contraNueva (contraseña) debe tener al menos 6 caracteres',
  })
  @MaxLength(20, {
    message: 'La contraNueva (contraseña) debe tener como maximo 20 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraNueva (contraseña) debe tener mayúsculas , minúsculas y un número',
  })
  contraNueva: string;

  @IsEqualToProperty('contraNueva', { message: 'debe ser igual que password' })
  repiteContraNueva: string;
}
