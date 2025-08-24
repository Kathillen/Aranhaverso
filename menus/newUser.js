// Criação de novos usuários

import {log, text, isCancel, password} from "@clack/prompts"

// importando de outros documentos
import {userManeger} from "../usersControl/users.js"; 
import { mainMenu } from "./menu.js";


export async function createUsers(){
    let username;
    let password;
    do {
        username = await text ({
            message: "Digite o username:"
        })
        if( userManeger.users.has(username)){ // verificando se já existe um usuário com esse nome
            log.error("Opa, notei que já existe um aranha com esse nome, tente novamente!"); 
        }
    } while(userManeger.users.has(username)); // enquanto existir um user com este nome, irá continuar exibindo o prompt
    
    if(isCancel(username)){ 
        mainMenu() // chamando o menu principal
        return;
    }

        do {
        password = await text ({
            message: "Digite a senha que você deseja:"
        })
        if(password.length < 6){ 
            log.error("Ei, sua senha precisa ter no mínimo 6 caracteres. Tente novamente!"); 
        } 
    } while(password.length < 6); 

    
        if(isCancel(password)){ 
            mainMenu()
            return;
        }

        const user = { 
        position: "Aracnídeo",
        username,
        password, 
        status : "Usuário ativo", 
        createdAt: new Date().toISOString() // Para receber a data atual e salvar a data em um obj json
    }
    userManeger.create(user) // Para criar um novo user

    log.success("Usuário criado com sucesso!"); 
    setTimeout(() => mainMenu() , 1000) 
}