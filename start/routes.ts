/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/login', 'UsersController.login');
}).prefix('api/v1')

Route.group(() => {
  Route.post('/create', 'UsersController.create');
  Route.get('/getUsers', 'UsersController.getUsers');
  Route.get('/getUser/:id_user', 'UsersController.getUser');
  Route.put('/update/:id_user', 'UsersController.update');
}).prefix('api/v1/user').middleware(['auth', 'admin'])

Route.group(() => { //Rutas para crear Roles y Tipos de documentos
  Route.post('/rol/create', 'RolsController.create');
  Route.post('/type-document/create', 'TypeDocuementsController.create');
}).prefix('api/v1').middleware(['auth', 'admin'])

Route.group(() => {//Rutas para CRUD de Preguntas y Respuestas
  Route.post('/create', 'QuestionsController.create').middleware('admin');
  Route.get('/getQuestions', 'QuestionsController.getQuestions');
  Route.delete('/deleteQuestion/:id_question', 'QuestionsController.deleteQuestion').middleware('admin');
  Route.put('/updateQuestion/:id_question', 'QuestionsController.updateQuestion').middleware('admin');
  Route.get('/getOptions/:id_question', 'AnswersController.getOptions');
  Route.put('/updateAnswer/:id_opcion', 'AnswersController.updateAnswer').middleware('admin');
}).prefix('api/v1/questions').middleware('auth')

Route.group(() => { //Rutas para crear y listar formularios
  Route.post('/postquestions', 'FormsController.create');
  Route.get('/getquestions', 'FormsController.getForms').middleware('admin');
}).prefix('api/v1/form').middleware('auth')