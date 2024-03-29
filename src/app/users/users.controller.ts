import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { UsersService } from './users.service';

@Controller('usuario')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  obtenerUsuarios(@Query() paginationDto: PaginationDto) {
    return this.usersService.obtenerUsuarios(paginationDto);
  }

  @Get(':id')
  obtenerUsuarioId(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.obtenerUsuarioId(id);
  }

  @Get('eliminados')
  obtenerUsuariosEliminados() {
    return this.usersService.obtenerUsuariosEliminados();
  }

  @Get('search/correo/:correo')
  buscarUsuarioPorCorreo(@Param('correo') correo: string) {
    return this.usersService.buscarUsuarioPorCorreo(correo);
  }

  @Get('search/celu/:celular')
  buscarUsuarioPorCelular(@Param('celular') celular: string) {
    return this.usersService.buscarUsuarioPorCelular(celular);
  }

  @Get('search/rol/:rol')
  buscarUsuarioPorRol(@Param('rol') rol: string) {
    return this.usersService.buscarUsuarioPorRol(rol);
  }

  @Get('search/condicion/:estado')
  buscarUsuarioPorEstado(@Param('estado') condicion: string) {
    return this.usersService.buscarUsuarioPorEstado(condicion);
  }

  @Get('search/:id')
  buscarUsuarioPorId(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.buscarUsuarioPorId(id);
  }

  @Get('search/sede/:sede')
  buscarUsuarioPorSede(@Param('sede') sede: string) {
    return this.usersService.buscarUsuarioPorSede(sede);
  }

  @Get('search/docente/:idSede')
  buscarDocentePorSede(@Param('idSede') idSede: number) {
    return this.usersService.buscarDocentePorSede(idSede);
  }

  @Get('search/estudiante/:idSede')
  buscarEstudiantePorSede(@Param('idSede') idSede: number) {
    return this.usersService.buscarEstudiantePorSede(idSede);
  }
}
