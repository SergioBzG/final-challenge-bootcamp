import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

//En esta función se crea un token y se devuelve porque vamos a realizar pruebas  a recursos que solicitan token
export async function getTokenAuthAdmin(): Promise<string> {
    let endpoint = "/api/v1/login"
    let body ={
        email: "carmen@unal.edu.co",
        password: "cassandra" //Estos datos deben de existir en la bd
    }
    let axiosResponse = await axios.post(`${Env.get ("PATH_APP") + endpoint}`, body)//La variable PATH_APP debe agregarse al archivo Env.test
    return axiosResponse.data["token"]
}