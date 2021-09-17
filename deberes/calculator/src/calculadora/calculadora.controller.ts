import {
  Body,
  Headers,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
  Put,
  Param,
} from '@nestjs/common';
import { request } from 'express';
import { constants } from 'http2';

//suma
@Controller('calculadora')
export class CalculadoraController {
  @Get('suma')
  @HttpCode(200)
  sumaParametros(
    @Query() queryParametros,
    @Res({ passthrough: true }) respuesta,
    @Req() request,
  ) {
    const galletas = request.signedCookies;
    const galletaTotal = galletas['total'];

    const numero1 = Number(queryParametros.numero1);
    const numero2 = Number(queryParametros.numero2);
    const respuestaCalculo = numero1 + numero2;

    const valorCookie = seteaTotal(galletaTotal, respuestaCalculo);

    console.log('valor cookie suma' + valorCookie.cookieValor);

    respuesta.cookie('total', valorCookie.cookieValor.toString(), {
      signed: true,
    });
    return (
      'Respuesta = ' +
      respuestaCalculo +
      '\nValor total = ' +
      valorCookie.cookieValor +
      '\n' +
      valorCookie.mensaje
    );
  }

  @Post('resta')
  @HttpCode(201)
  resta(
    @Body() parametrosBody,
    @Headers() headers,
    @Req() request,
    @Res({ passthrough: true }) respuesta,
  ) {
    const numero1 = Number(parametrosBody.numero1);
    const numero2 = Number(parametrosBody.numero2);

    const galletas = request.signedCookies;
    const galletaTotal = galletas['total'];

    const respuestaCalculo = numero1 - numero2;
    const valorCookie = seteaTotal(galletaTotal, respuestaCalculo);

    console.log('valorCookie resta' + valorCookie.cookieValor);

    respuesta.cookie('total', valorCookie.cookieValor.toString(), {
      signed: true,
    });
    respuesta.header('resultado', respuestaCalculo.toString());
    return (
      'Respuesta = ' +
      respuestaCalculo +
      '\nValor total = ' +
      valorCookie.cookieValor +
      '\n' +
      valorCookie.mensaje
    );
  }

  @Put('multiplicacion/:numero1/:numero2')
  @HttpCode(200)
  multiplicacion(
    @Param() parametroRuta,
    @Res({ passthrough: true }) respuesta,
    @Req() request,
  ) {
    const numero1 = Number(parametroRuta.numero1);
    const numero2 = Number(parametroRuta.numero2);

    const galletas = request.signedCookies;
    const galletaTotal = galletas['total'];

    const respuestaCalculo = numero1 * numero2;
    const valorCookie = seteaTotal(galletaTotal, respuestaCalculo);

    respuesta.cookie('total', valorCookie.cookieValor.toString(), {
      signed: true,
    });

    return (
      'Respuesta = ' +
      respuestaCalculo +
      '\nValor total = ' +
      valorCookie.cookieValor +
      '\n' +
      valorCookie.mensaje
    );
  }

  @Get('division/:numero1/:numero2')
  @HttpCode(201)
  division(
    @Req() peticion,
    @Res({ passthrough: true }) respuesta,
    @Param() parametrosRuta,
  ) {
    const galletas = peticion.signedCookies;
    const galletaTotal = galletas['total'];

    let respuestaCalculo = 0;

    const numero1 = Number(parametrosRuta.numero1);
    const numero2 = Number(parametrosRuta.numero2);

    respuestaCalculo = numero1 / numero2;
    console.log('resultado division: ' + respuestaCalculo);
    const valorCookie = seteaTotal(galletaTotal, respuestaCalculo);

    respuesta.cookie('total', valorCookie.cookieValor.toString(), {
      signed: true,
    });
    return (
      'Respuesta = ' +
      respuestaCalculo +
      '\nValor total = ' +
      valorCookie.cookieValor +
      '\n' +
      valorCookie.mensaje
    );
  }
}

function seteaTotal(
  galletaTotal: any,
  respuestaCalculo: number,
): { cookieValor: number; mensaje: string } {
  let valorCookie = 0;
  let mensajeReseteo = '';
  if (galletaTotal == undefined) {
    console.log('cookie undefined');
    valorCookie = 100 - respuestaCalculo;
  } else {
    console.log('cookie defined');
    console.log('total antes ' + Number(galletaTotal));
    valorCookie = Number(galletaTotal) - respuestaCalculo;
  }
  if (valorCookie <= 0) {
    console.log('total reseteado');
    valorCookie = 100;
    mensajeReseteo = 'terminó juego, se reseteó cookie a 100';
  }
  console.log('total despues ' + valorCookie);
  const respuesta = {
    cookieValor: valorCookie,
    mensaje: mensajeReseteo,
  };
  return respuesta;
}