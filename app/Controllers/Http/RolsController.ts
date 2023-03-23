import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Models/Rol';

export default class RolsController {
    public async create({request, response}: HttpContextContract){
        try{
            const dataRol = request.only(['name', 'state']);
            await Roles.create(dataRol);
            return response.status(200).json({
                state : true,
                message: 'Rol creado correctamente'
            })

        }catch(error){
            return response.status(400).json({
                state : false,
                message: 'Error en el servidor'
            })
        }
    }
}
