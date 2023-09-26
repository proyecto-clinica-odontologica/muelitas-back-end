import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(id)
  }

  @Get('check-status')
  @Auth()
  checkStatus(@GetUser() user: User) {
    return this.authService.checkStatus(user);
  }
}
