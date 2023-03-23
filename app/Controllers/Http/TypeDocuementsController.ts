import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypeDocument from 'App/Models/TypeDocument';

export default class TypeDocuementsController {
    public async create({request, response}: HttpContextContract){
    
        try{
            const dataTypeDocument = request.only(['name', 'state']);
            await TypeDocument.create(dataTypeDocument);
            return response.status(200).json({
                state : true,
                message: 'TypeDocument creado correctamente'
            })

        }catch(error){
            return response.status(400).json({
                state : false,
                message: 'Error en el servidor'
            })
        }
    }
}
