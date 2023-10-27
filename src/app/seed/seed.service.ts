import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Docente } from '../docentes/entities/docente.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly dbUser: Repository<User>,

    @InjectRepository(Docente)
    private readonly dbDocente: Repository<Docente>,
  ) {}

  async seed() {
    await this.dbDocente.remove(await this.dbDocente.find());
    await this.dbUser.remove(await this.dbUser.find());

    const users = [
      {
        Correo: 'maycol@gmail.com',
        Contra: await bcrypt.hash('Abc123', 10),
        NumDoc: '71039100',
        Nombre: 'maycol',
        Apellido: 'rodriguez mallqui',
        Celular: '998238111',
        Codigo: 'DEF456',
        Rol: 'admin',
      },
      {
        Correo: 'anibaljhamil@gmail.com',
        Contra: await bcrypt.hash('Abc123', 10),
        NumDoc: '55010644',
        Nombre: 'anibal jhamil',
        Apellido: 'huaman verastein',
        Celular: '111444777',
        Codigo: 'DEF456',
        Rol: 'admin',
      },
      {
        Correo: '75018052@continental.edu.pe',
        Contra: await bcrypt.hash('Abc123', 10),
        NumDoc: '75018052',
        Nombre: 'mathyas',
        Apellido: 'coronado martinez',
        Celular: '111222333',
        Codigo: 'DEF456',
        Rol: 'docente',
      },
      {
        Correo: '72010644@continental.edu.pe',
        Contra: await bcrypt.hash('Abc123', 10),
        NumDoc: '72010644',
        Nombre: 'cristopher',
        Apellido: 'aguilar condor',
        Celular: '444333444',
        Rol: 'docente',
      },
      {
        Correo: '76092127@continental.edu.pe',
        Contra: await bcrypt.hash('Abc123', 10),
        NumDoc: '76092127',
        Nombre: 'grozny',
        Apellido: 'cusicuna mucha',
        Celular: '555444555',
        Rol: 'docente',
        Genero: 'femenino',
      },
      {
        Correo: 'zeus_apolo85@hotmail.com',
        Contra: await bcrypt.hash('Abc123', 10),
        NumDoc: '22222222',
        Nombre: 'hector',
        Apellido: 'chavez perez',
        Celular: '666555666',
        Rol: 'docente',
      },
      {
        Correo: '72638267@continental.edu.pe',
        Contra: await bcrypt.hash('Abc123', 10),
        NumDoc: '72638267',
        Nombre: 'carla ariana',
        Apellido: 'santa maría astuhuamán',
        Celular: '777555777',
        Rol: 'estudiante',
        Genero: 'femenino',
      },
      {
        Correo: 'carlitosjhonatan17@gmail.com',
        Contra: await bcrypt.hash('Abc123', 10),
        NumDoc: '11111111',
        Nombre: 'carlos',
        Apellido: 'lavado ayala',
        Celular: '888555888',
        Rol: 'estudiante',
      },
      {
        Correo: '76143923@continental.edu.pe',
        Contra: await bcrypt.hash('Password123!', 10),
        NumDoc: '76143923',
        Nombre: 'jean carlos',
        Apellido: 'suazo vilca',
        Celular: '909370930',
        Rol: 'estudiante',
      },
      {
        Correo: '73600753@continental.edu.pe',
        Contra: await bcrypt.hash('Password123!', 10),
        NumDoc: '73600753',
        Nombre: 'yeric luis',
        Apellido: 'flores lapa',
        Celular: '934548595',
        Rol: 'estudiante',
      },
      {
        Correo: '75906805@continental.edu.pe',
        Contra: await bcrypt.hash('Password123!', 10),
        NumDoc: '75906805',
        Nombre: 'jean',
        Apellido: 'torres ricse',
        Celular: '989629302',
        Rol: 'estudiante',
      },
      {
        Correo: '45544835@continental.edu.pe',
        Contra: await bcrypt.hash('Password123!', 10),
        NumDoc: '45544835',
        Nombre: 'erick anton',
        Apellido: 'oré tarazona',
        Celular: '958023872',
        Rol: 'estudiante',
      },
      {
        Correo: '70105432@continental.edu.pe',
        Contra: await bcrypt.hash('Password123!', 10),
        NumDoc: '70105432',
        Nombre: 'juan anthony',
        Apellido: 'huaman sanchez',
        Celular: '981704288',
        Rol: 'estudiante',
      },
      {
        Correo: '45951116@continental.edu.pe',
        Contra: await bcrypt.hash('Password123!', 10),
        NumDoc: '45951116',
        Nombre: 'dennys',
        Apellido: 'dolorier díaz',
        Celular: '999425405',
        Rol: 'estudiante',
      },
      {
        Correo: '74525617@continental.edu.pe',
        Contra: await bcrypt.hash('Password123!', 10),
        NumDoc: '74525617',
        Nombre: 'jheycit',
        Apellido: 'cangalaya antezana',
        Celular: '903684433',
        Rol: 'estudiante',
        Genero: 'femenino',
      },
      {
        Correo: '75513497@continental.edu.pe',
        Contra: await bcrypt.hash('Password123!', 10),
        NumDoc: '75513497',
        Nombre: 'alexis',
        Apellido: 'suasnabar gaspar',
        Celular: '928697777',
        Rol: 'docente',
      },
      {
        Correo: '75380573@continental.edu.pe',
        Contra: await bcrypt.hash('Password123!', 10),
        NumDoc: '75380573',
        Nombre: 'layoned',
        Apellido: 'muñico tadeo',
        Celular: '956332146',
        Rol: 'estudiante',
      },
      {
        Correo: '74897825@continental.edu.pe',
        Contra: await bcrypt.hash('Password123!', 10),
        NumDoc: '74897825',
        Nombre: 'flor de maria',
        Apellido: 'gutarra romo',
        Celular: '977619251',
        Rol: 'docente',
        Genero: 'femenino',
      },
      {
        Correo: '72549048@continental.edu.pe',
        Contra: await bcrypt.hash('Password123!', 10),
        NumDoc: '72549048',
        Nombre: 'jesús',
        Apellido: 'soto montes',
        Celular: '934704775',
        Rol: 'estudiante',
      },
      {
        Correo: '72505451@continental.edu.pe',
        Contra: await bcrypt.hash('Password123!', 10),
        NumDoc: '72505451',
        Nombre: 'renato',
        Apellido: 'rodríguez santana',
        Celular: '924717757',
        Rol: 'estudiante',
      },
      {
        Correo: '72082178@continental.edu.pe',
        Contra: await bcrypt.hash('Password123!', 10),
        NumDoc: '72082178',
        Nombre: 'alfredo antenor',
        Apellido: 'hoces ricse',
        Celular: '994704993',
        Rol: 'estudiante',
      },
    ];
    await this.dbUser.save(users);
    return 'seed completado';
  }
}
