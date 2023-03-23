import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';
import Question from 'App/Models/Question';

export default class AnswersController {

    public async getOptions({params, response}: HttpContextContract): Promise<void>{//Listar opciones de una pregunta
        try{
            await Question.findOrFail(params.id_question);
            const options = await Answer.query().where({question_id: params.id_question}).from('answers').select('id', 'option');

            return response.status(200).json({
                state : true,
                message: 'Listado de opciones',
                options
            })
        }catch(error){
            return response.status(400).json({
                state : false,
                messege: 'Error al obtener el listado de opciones'
            })
        }
    }

    public async updateAnswer({request, response}: HttpContextContract): Promise<void>{
        try{
            const {opcion, iscorrect} = request.all();
            const answer = await Answer.findOrFail(request.param('id_opcion'));
            answer.option = opcion;
            answer.is_correct = iscorrect;
            await answer.save();

            return response.status(200).json({
                state : true,
                message: 'Opcion editada con exito'
            })

        }catch(error){
            return response.status(400).json({
                state : false,
                message: 'Error al editar la opcion'
            })
        }
    }

}
