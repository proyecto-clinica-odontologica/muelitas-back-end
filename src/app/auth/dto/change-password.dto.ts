import { IsString, Length, Matches } from 'class-validator';
import { IsEqualToProperty } from '../decorators/validar-password.decorator';

export class ChangePasswordDto {
  @IsString()
  @Length(6, 20, {
    message: 'La contraActual (contraseña) debe tener entre 6 y 20 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraActual (contraseña) debe tener mayúsculas , minúsculas y un número',
  })
  Contra: string;

  @IsString()
  @Length(6, 20, {
    message: 'La contraNueva (contraseña) debe tener entre 6 y 20 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraNueva (contraseña) debe tener mayúsculas , minúsculas y un número',
  })
  ContraNueva: string;

  @IsEqualToProperty('ContraNueva', { message: 'debe ser igual que password' })
  RepiteContraNueva: string;
}
