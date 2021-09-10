import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaService} from "./usuario/prisma.service";
//DECORADOR -->Funciones que ayudan hacer algo extra al código
@Module({
  imports: [], //modulos importados
  controllers: [AppController], //controladores
  //controladores: los que receptan los doucmentos
  providers: [
      AppService,
      PrismaService

  ], //servicios de este módiblo
  exports: [AppService], //servicios exportados (que se pueden usar fuera de este módulo)
})
export class AppModule {}
