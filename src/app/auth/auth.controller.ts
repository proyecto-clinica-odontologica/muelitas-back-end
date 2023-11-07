import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('usuario')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  crearCuenta(@Body() createUserDto: CreateUserDto) {
    return this.authService.crearCuenta(createUserDto);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    console.log(id);
    return this.authService.actualizarUsuario(id, updateUserDto);
  }

  @Delete(':id')
  eliminarUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.authService.eliminarUsuario(id);
  }

  @Get('loginemail/:correo/:contra')
  loginEmail(@Param('correo') correo: string, @Param('contra') contra: string) {
    return this.authService.loginEmail(correo, contra);
  }

  @Get('logincelu/:celular/:contra')
  loginCelular(@Param('celular') celular: string, @Param('contra') contra: string) {
    return this.authService.loginCelular(celular, contra);
  }

  @Patch('cambiar-password/:id')
  cambiarPassword(@Param('id') id: number, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.cambiarPassword(id, changePasswordDto);
  }

  @Patch('solicitar-restablecer-password')
  solicitarRestablecerPassword(@Body() requestResetPasswordDto: RequestResetPasswordDto) {
    return this.authService.solicitarRestablecerPassword(requestResetPasswordDto);
  }

  @Patch('restablecer-password')
  restablecerPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.restablecerPassword(resetPasswordDto);
  }

  @Put('restaurar-usuario/:id')
  activarCuenta(@Param('id') id: number) {
    return this.authService.activarCuenta(id);
  }
}
