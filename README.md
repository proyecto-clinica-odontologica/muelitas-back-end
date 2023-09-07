<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descripción

Este repositorio aloja el backend del sistema clinico odontologico.... . Utiliza Nest.js como framework de desarrollo y TypeORM como ORM para la base de datos. La base de datos utilizada es MySQL.

## Instalación de nest

```bash
npm i -g @nestjs/cli
```

## Instalación de dependencias

```bash
yarn install
```

## Configurar las variables de entorno

- Copiar el archivo .env.template y renombrarlo a .env y configurar las variables de entorno

## Levantar contenedor de base de datos

- Abrir docker desktop
- Ejecutar el siguiente comando
  ```bash
  docker-compose up -d
  ```

## Ejecutar el proyecto

```bash
yarn start:dev
```

## License

Nest is [MIT licensed](LICENSE).
