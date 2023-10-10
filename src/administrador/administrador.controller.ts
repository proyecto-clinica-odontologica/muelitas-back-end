import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Controller('administrador')
export class AdministradorController {
  constructor(private readonly administradorService: AdministradorService) {}

  @Post('create')
  registrarAdministrador(
    @Body() createAdministradorDto: CreateAdministradorDto,
  ) {
    return this.administradorService.registrarAdministrador(
      createAdministradorDto,
    );
  }

  @Get()
  obtenerAdministradores() {
    return this.administradorService.obtenerAdministradores();
  }

  @Get('eliminados')
  obtenerAdministradoresEliminados() {
    return this.administradorService.obtenerAdministradores();
  }

  @Get('search/id/:id')
  buscarAdministradorPorId(@Param('id', ParseIntPipe) id: number) {
    return this.administradorService.buscarAdministradorPorId(id);
  }

  @Get('search/nombre/:nombreUsuario')
  buscarAdministradorPorNombre(@Param('nombreUsuario') nombreUsuario: string) {
    return this.administradorService.buscarAdministradorPorNombre(
      nombreUsuario,
    );
  }

  @Patch(':id')
  actualizarAdministrador(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdministradorDto: UpdateAdministradorDto,
  ) {
    return this.administradorService.actualizarAdministrador(
      id,
      updateAdministradorDto,
    );
  }

  @Delete(':id')
  eliminarAdministrador(@Param('id', ParseIntPipe) id: number) {
    return this.administradorService.eliminarAdministrador(id);
  }

  @Patch('restaurar/:id')
  restaurarAdministrador(@Param('id', ParseIntPipe) id: number) {
    return this.administradorService.restaurarAdministrador(id);
  }
}
