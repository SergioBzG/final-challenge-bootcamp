import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';
import Form from 'App/Models/Form';
import Question from 'App/Models/Question';

export default class QuestionsController {

    public async create({request, response}: HttpContextContract){
        const {question, options} = request.all();
        try{
            const quest = new Question();
            quest.question = question;
            quest.state = true;
            await quest.save();
            
            options.forEach(async (option: any) => {
                const answer = new Answer();
                answer.option = option.opcion;
                answer.is_correct = option.iscorrect;
                answer.question_id = quest.id;
                answer.state = true;
                await answer.save();
            });

            return response.status(200).json({
                state : true,
                message: 'Pregunta creada exitosamente'
            })

        }catch(error){
            return response.status(400).json({
                state : false,
                message: 'Error al crear la pregunta'
            })
        }
    }

    public async getQuestions({response}: HttpContextContract): Promise<void>{
        try{
            const questions = await Question.query().select('question', 'id')
            return response.status(200).json({
                state : true,
                questions
            })
        }catch(error){
            return response.status(400).json({
                state : false,
                message: 'Error al listar las preguntas'
            })
        }
    }

    public async deleteQuestion({params, response}: HttpContextContract): Promise<void>{
        try{
            //Primero se eliminan las opciones de la pregunta
            await Question.findOrFail(params.id_question)
            const answers = await Answer.query().where({question_id: params.id_question}).select('id').from('answers');
            const answersId = answers.map(ans => ans.id);
            await Form.query().whereIn('answer_id', [...answersId]).from('forms').delete();
            await Answer.query().where({question_id: params.id_question}).from('answers').delete();
            await Question.query().where({id: params.id_question}).from('questions').delete();
            return response.status(200).json({
                state : true,
                message: 'Pregunta Eliminada con exito'
            })
        }catch(error){
            return response.status(400).json({
                state : false,
                message: 'Error al eliminar la pregunta'
            })
        }
    }

    public async updateQuestion({request, params, response}: HttpContextContract): Promise<void>{
        try{
            const {question} = request.all();
            const quest = await Question.findOrFail(params.id_question);
            quest.question = question;
            await quest.save();
            return response.status(200).json({
                state: true,
                message: 'Pregunta editada con exito'
            })
        }catch(error){
            return response.status(400).json({
                state : false,
                message: 'Error al editar la pregunta',
            })  
        }
    }
    
}

