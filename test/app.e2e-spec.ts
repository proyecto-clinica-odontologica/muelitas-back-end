import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/usuario (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/usuario').expect(200);

    const users = response.body;
    expect(users).toBeInstanceOf(Array);
    expect(users).toHaveLength(users.length);
  });

  it('/docentes (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/docentes').expect(200);

    const docentes = response.body;
    expect(docentes).toBeInstanceOf(Array);
    expect(docentes).toHaveLength(docentes.length);
  });

  it('/estudiantes (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/estudiantes').expect(200);

    const estudiantes = response.body;
    expect(estudiantes).toBeInstanceOf(Array);
    expect(estudiantes).toHaveLength(estudiantes.length);
  });

  it('/administrador (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/administrador').expect(200);

    const administradores = response.body;
    expect(administradores).toBeInstanceOf(Array);
    expect(administradores).toHaveLength(administradores.length);
  });

  it('/administrador/create (POST)', async () => {
    await request(app.getHttpServer())
      .post('/administrador/create')
      .send({
        idUsuario:26,
        CodigoAcceso: 'DEF455',
      })
      .expect(201);
  });

  it('/usuario/create (POST)', async () => {
    await request(app.getHttpServer())
      .post('/usuario/create')
      .send({
  	      "Correo": "alfonso.doe@example.com",
  	      "Contra": "Abc123",
  	      "NumDoc": 98765999,
  	      "Nombre": "Alfonso",
  	      "Apellido": "Doe Doe",
  	      "Celular": 113456799,
  	      "Codigo": "GHI782",
  	      "Rol": "administrador",
  	      "TipoDocumento": "dni",
  	      "Genero": "masculino",
  	      "Pago": "pagado",
  	      "Activo": true,
  	      "RestablecerContra": "desactivado"
      })
      .expect(201);
  });
});
