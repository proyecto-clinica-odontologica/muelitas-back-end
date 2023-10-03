import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  crearCuenta(@Body() createUserDto: CreateUserDto) {
    return this.authService.crearCuenta(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Patch('cambiar-password/:id')
  cambiarPassword(
    @Param('id') id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.cambiarPassword(id, changePasswordDto);
  }

  @Patch('solicitar-restablecer-password')
  solicitarRestablecerPassword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto,
  ) {
    return this.authService.solicitarRestablecerPassword(
      requestResetPasswordDto,
    );
  }

  @Patch('restablecer-password')
  restablecerPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.restablecerPassword(resetPasswordDto);
  }
}
