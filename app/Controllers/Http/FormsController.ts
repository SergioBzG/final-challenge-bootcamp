import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Answer from 'App/Models/Answer';
import Form from 'App/Models/Form';
import Question from 'App/Models/Question';
import User from 'App/Models/User';

export default class FormsController {

    public async create({request, response}:HttpContextContract): Promise<void>{
        const {estudianteId, answers} = request.all();
        try{
            const student = await User.findBy('id', estudianteId);
            if(!student){
                return response.status(400).json({
                    state: false,
                    message: 'No se pudieron almacenar las respuestas'
                })
            }
            //Se verfica que las referencias a las respuestas existan
            const answersId:Answer[] = await Answer.query().select('id');
            const answersIdArr:number[] = answersId.map(ans => ans.id);
            for(const ans of answers){
                if(!answersIdArr.includes(ans)){
                    return response.status(400).json({
                        state: false,
                        message: 'No se pudieron almacenar las respuestas'
                    })
                }
            }

            //Se crea un form por cada respuesta dada por el estudiante
            for(const ans of answers){
                const form = new Form();
                form.student_id = estudianteId;
                form.answer_id = ans;
                form.state = true;
                await form.save();
            }

            return response.status(200).json({
                state: true,
                message: 'Respuestas almacenadas con exito'
            })

        }catch{
            return response.status(400).json({
                state: false,
                message: 'No se pudieron almacenar las respuestas'
            })
        }
    }

    public async getForms({response}:HttpContextContract): Promise<void>{
        try{
            const questionsIn:Question[] = await Database.from('questions')
                .whereIn('id',
                    Database.from('answers').whereIn('id',
                        Database.from('forms').select('answer_id')
                        ).distinct('question_id')
                    ).select('id') //Se obtinen las preguntas que tienen al menos una respuesta registrada en los forms
            
            const questionsId = questionsIn.map(quest => quest.id) //Se obtiene el id de las preguntas
            let questions = await Question.query().whereIn('id', [...questionsId]).preload('options', sql => {sql.select('id', 'option')}).select('question', 'id') //Se obtienen las preguntas con sus opciones

            return response.status(200).json({
                state: true,
                questions
            })

        }catch(error){
            console.log(error)
            return response.status(400).json({
                state: false,
                message: 'Error al obtener el listado',
            })
        }
    }
}
