import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //método http //implicito al slahs raiz
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('texto')
  @HttpCode(200)
  holaTexto(): string {
    return 'Hola texto';
  }
  @Get('html')
  @HttpCode(201)
  holaHTML(): string {
    return '<h1>HOla HTML</h1>';
  }
  @Get('json')
  @HttpCode(202)
  holaJSON(): string {
    return '{mensaje: "Hola json"}';
  }

  //erro bad request
  //mandar errores al cliente
  @Get('internal-error')
  internalError() {
    throw new InternalServerErrorException();
  }

  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }

  @Get('setear-cookie-insegura')//cuando el lciente introduzca esto
  setearCookieInsegura(
    @Req() req, //request peticion del usuario. Obtener el objeto de peticion
    @Res() res, //resopnse peticion respuesta. Obtener el objeto de respuestas
  ) {
    res.cookie(//responde el servidor con una cookies segura e insegura
      'galletaInsegura', //nombre
      'Tengo hambre', //valor
    );
    res.cookie('galletaSegura', 'web', { //para que sea segura solo hay que añadir
      secure: true, //..esto
    });
    res.send('ok');
  }

  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    return mensaje;
  }
}
