import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

//En esta función se crea un token y se devuelve porque vamos a realizar pruebas  a recursos que solicitan token
export async function getTokenAuth(): Promise<string> {
    let endpoint = "/api/v1/login"
    let body ={
        email: "danielc88@gmail.co",
        password: "danielc88" //Estos datos deben de existir en la bd
    }
    let axiosResponse = await axios.post(`${Env.get ("PATH_APP") + endpoint}`, body)//La variable PATH_APP debe agregarse al archivo Env.test
    return axiosResponse.data["token"]
}