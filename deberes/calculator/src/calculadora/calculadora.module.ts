import { CalculadoraController } from './calculadora.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    //modulos importados
  ],
  providers: [
    //declaramos servicio
  ],
  exports: [
    //exportamos servicio
  ],
  controllers: [
    //declaramos controladores
    CalculadoraController,
  ],
})
export class CalculadoraModule {}