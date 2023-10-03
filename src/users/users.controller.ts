import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  obtenerUsuarios() {
    return this.usersService.obtenerUsuarios();
  }

  @Get(':id')
  buscarUnUsuario(@Param('id') id: string) {
    return this.usersService.buscarUnUsuario(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.actualizarUsuario(id, updateUserDto);
  }

  @Delete(':id')
  eliminarUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.eliminarUsuario(id);
  }
}
