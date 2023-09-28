import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
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
}
