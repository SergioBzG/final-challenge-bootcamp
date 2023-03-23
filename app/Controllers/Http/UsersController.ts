import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import bcryptjs from 'bcryptjs'
import Roles from 'App/Models/Rol'

export default class UsersController {

    public async create({request, response}: HttpContextContract){
        
        const {firstName, secondName, surname, secondSurName, typeDocument,documentNumber, email, password, phone, rolId} = request.all();
        try{
            if(await this.emailValidate(email)){
                return response.status(400).json({
                    state : false,
                    message: 'Ya existe un usuario con este correo'
                })
            }
            if(await this.documetValidate(documentNumber)){
                return response.status(400).json({
                    state : false,
                    message: 'Ya existe un usuario con este documento'
                })
            }
            const salt = bcryptjs.genSaltSync();
            const usuario = new User(); 
            usuario.first_name = firstName;
            usuario.second_name = secondName;
            usuario.surname = surname;
            usuario.second_sur_name = secondSurName;
            usuario.type_document = typeDocument;
            usuario.document_number = documentNumber;
            usuario.email = email;
            usuario.password = bcryptjs.hashSync(password, salt);
            usuario.phone = phone;
            usuario.rol_id = rolId == undefined ? 2: rolId; //1 = admin, 2 = estudiante
            usuario.state = true;
            await usuario.save();

            return response.status(200).json({
                state : true,
                message: 'Estudiante creado correctamente'
            })

        }catch(error){
            return response.status(400).json({
                state : false,
                message: 'Fallo en la creación del estudiante'
            })
        }
    }

    public async login({request, response}: HttpContextContract){
        const {email, password} = request.all();
        try{
            const user = await this.emailValidate(email);
            if(!user){
                return response.status(400).json({
                    state : false,
                    message: 'contraseña o email ivalido'
                })
            }

            const validPassword = bcryptjs.compareSync(password, user.password);
            if(!validPassword){
                return response.status(400).json({
                    state : false,
                    message: 'contraseña o email ivalido'
                })
            }

            const rolName:Roles[] = await Roles.query().where({id: user.rol_id}).select('name')

            const payload = {
                name: user.first_name,
                id: user.id,
                documenNumber: user.document_number
            }
            //Creación del token
            const token:string = jwt.sign(payload, Env.get('JWT_SECRET_KEY'), {expiresIn: '10 mins'});

            return response.status(200).json({
                state: true,
                id: user.id,
                name: user.first_name + ' ' + user.second_name + ' ' + user.surname + ' ' +  user.second_sur_name,
                role: rolName[0].name,
                message: 'Ingreso exitoso',
                token
            });

        }catch(error){
            return response.status(400).json({
                state : false,
                message: 'Error en el servidor'
            })
        }
    }

    public async getUsers({response}: HttpContextContract): Promise<void>{
        try{
            const users:User[] = await User.query().where({rol_id: 2}).from('users').select('first_name', 'second_name', 'surname', 'second_sur_name', 'type_document', 'document_number', 'email', 'phone');

            return response.status(200).json({  
                state: true,
                message: 'Listado de estudiantes',
                users
            });
        }catch(error){
            return response.status(400).json({
                state : false,
                message: 'Fallo en el listado de estudiantes'
            })
        }
    }

    public async getUser({response, params}: HttpContextContract):Promise<void>{
        try{
            const user:User = await User.findOrFail(params.id_user);
            return response.status(200).json({
                firstName: user.first_name,
                secondName: user.second_name,
                surname: user.surname,
                secondSurName: user.second_sur_name,
                typeDocument: user.type_document,
                documentNumber: user.document_number,
                email: user.email,
                phone: user.phone
            })
        }catch(error){
            return response.status(400).json({
                state : false,
                message: 'Error al consultar el detalle del usuario'
            })
        }
    }

    public async update({request, params, response}: HttpContextContract){
        try{
            const user:User = await User.findOrFail(params.id_user);
            const {firstName, secondName, surname, secondSurName, typeDocument, documentNumber, email, phone} = request.all();
            user.first_name = firstName;
            user.second_name = secondName;
            user.surname = surname;
            user.second_sur_name = secondSurName;
            user.type_document = typeDocument;
            user.document_number = documentNumber;
            user.email = email;
            user.phone = phone;
            await user.save();

            return response.status(200).json({
                state: true,
                message: 'Se actualizo correctamente'
            })

        }catch(error){
            return response.status(400).send({
                state : false,
                message: 'Error al actualizar'
            })
        }
    }

    public static verifyToken(authorizationHeader:string): boolean{
        const token:string = authorizationHeader.split(' ')[1];
        jwt.verify(token, Env.get('JWT_SECRET_KEY'), (error) => {
            if(error){
                throw new Error('Token expirado');
            }
        })
        return true
    }

    public static getPayload(authorizationHeader:string): any{
        const token:string = authorizationHeader.split(' ')[1];
        const payload:any =  jwt.verify(token, Env.get('JWT_SECRET_KEY'), {complete:true}).payload;
        return payload
    }

    private async emailValidate(email: string):Promise<any>{
        const user = await User.findBy('email', email);
        return user
    }

    private async documetValidate(documentNumber: string):Promise<boolean>{
        const user = await User.findBy('document_number', documentNumber);
        return user ? true : false
    }
}
