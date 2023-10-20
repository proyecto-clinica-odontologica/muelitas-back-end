/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoriaClinicaModule } from './HistoriaClinica/historia-clinica.module';
import {TypeOrmModule} from '@nestjs/typeorm' ;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:'localhost',
      port: 3306,
      username:'root',
      database:'nestbd',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    HistoriaClinicaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
