import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UsersController from 'App/Controllers/Http/UsersController';
import User from 'App/Models/User';

export default class ValidAdmin{

    public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
        const authorizationHeader:any = ctx.request.header('authorization');
    
        try{
          const {id} = UsersController.getPayload(authorizationHeader);
          const user = await User.findOrFail(id);

          if(!user){
            return ctx.response.status(401).json({
                state: false,
                message: 'Token no válido'
            })
          }

          if(user.rol_id != 1){
            return ctx.response.status(401).json({
                state: true,
                message: 'No tiene permisos para acceder a esta ruta'
            })
          }
          
          await next()
        }catch(error){
          return ctx.response.status(401).json({
            state: false,
            message: 'Falla relacionada con el token'
          })
        }  
      }

}