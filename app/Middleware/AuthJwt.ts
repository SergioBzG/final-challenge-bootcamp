import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController';

export default class AuthJwt {

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader:any = ctx.request.header('authorization');
    //Se verifica que exista un token de verificacion
    if(!authorizationHeader){
      return ctx.response.status(401).json({
        state: false,
        message: 'Falta el token de autorizacion'
      })
    }

    try{
      UsersController.verifyToken(authorizationHeader)
      await next()
    }catch(error){
      return ctx.response.status(400).json({
        state: false,
        message: 'Falla relacionada con el token'
      })
    }  
  }

}

